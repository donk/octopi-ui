import axios from 'axios';

import { API_KEY, OCTO_URL } from '../config';
console.log("Octoprint URL: ",OCTO_URL);

const api = axios.create({
  baseURL: OCTO_URL,
  headers: {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json',
  },
});

type PrinterState = {
  state: string;
  bedTemp: number;
  bedTempTarget: number;
  printerTemp: number;
  printerTempTarget: number;
};

type JobState = {
  durationCurrent: number;
  durationEstimate: number;
  durationRemaining: number;
  durationPercent: number;
  fileName: string;
  filamentLength: number;
  filamentVolume: number;
  state: string;
};

type LayerState = {
  heightCurrent: string;
  heightTotal: string;
  layerCurrent: string;
  layerTotal: string;
  layerAverageDuration: number;
  layerLastDuration: number;
};

type File = {
  name: string;
  refs: any;
  size: number;
  gcodeAnalysis: any;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  durationEstimate: number;
};

type FileStat = {
  countFailure: number;
  countSuccess: number;
  lastPrint: string;
  lastPrintSucceeded: boolean;
};

type Stats = {
  jobState: JobState;
  layerState: LayerState;
  printerState: PrinterState;
};

type FileDetail = {
  fileName: string;
  fileSize: number;
  durationEstimate: number;
  fileUrl: string;
  stats: FileStat;
};

type Event = {
  error?: string;
  file?: string;
  success: boolean;
};

export const fetchPrinterState = async (): Promise<PrinterState> => {
  const { data } = await api.get('/api/printer');
  const { state, temperature } = data;

  return {
    state: state.text,
    bedTemp: temperature?.bed?.actual,
    bedTempTarget: temperature?.bed?.target,
    printerTemp: temperature?.tool0?.actual,
    printerTempTarget: temperature?.tool0?.target,
  };
};

export const fetchLayerState = async (): Promise<LayerState> => {
  const { data } = await api.get('/plugin/DisplayLayerProgress/values');
  const { height, layer } = data;

  return { 
    heightCurrent: height?.current,
    heightTotal: height?.totalWithExtrusion,
    layerCurrent: layer?.current,
    layerTotal: layer?.total,
    layerAverageDuration: layer?.averageLayerDurationInSeconds,
    layerLastDuration: layer?.lastLayerDurationInSeconds,
  };
};

export const fetchJobState = async (): Promise<JobState> => {
  const { data } = await api.get('/api/job');
  const { job, progress, state } = data;
  const { estimatedPrintTime, file, filament } = job;

  return {
    durationCurrent: progress?.printTime,
    durationEstimate: estimatedPrintTime,
    durationPercent: progress?.completion,
    durationRemaining: progress?.printTimeLeft,
    fileName: file?.display,
    filamentLength: filament?.length,
    filamentVolume: filament?.volume,
    state,
  };
};

export const fetchLocalFile = async (filename: string): Promise<FileDetail> => {
  const { data } = await api.get(`/api/files/local/${filename}`);
  const { name, size, refs, gcodeAnalysis, print } = data;
  const { estimatedPrintTime } = gcodeAnalysis;

  return {
    durationEstimate: estimatedPrintTime,
    fileName: name,
    fileSize: size,
    fileUrl: refs.download,
    stats: {
      countFailure: print?.failure,
      countSuccess: print?.success,
      lastPrint: print?.last?.date,
      lastPrintSucceeded: print?.last?.success,
    },
  };
};

export const fetchLocalFiles = async (): Promise<Array<File>> => {
  const { data } = await api.get('/api/files');
  const { files } = data;

  return files.map((file: File) => {
    const { name, refs, size, gcodeAnalysis } = file;
    const { estimatedPrintTime } = gcodeAnalysis;
    return {
      fileName: name,
      fileSize: size,
      fileUrl: refs?.download,
      durationEstimate: estimatedPrintTime,
    };
  });
};

export const fetchStats = async (): Promise<Stats> => {
  const printerState = await fetchPrinterState();
  const jobState = await fetchJobState();
  const layerState = await fetchLayerState();

  return {
    jobState,
    layerState,
    printerState,
  };
};

export const printFile = async (fileString: string): Promise<Event> => {
  const fileName = `${fileString}.gcode`;
  const filePath = `/api/files/local/${fileName}`;

  const files = await fetchLocalFiles();
  if (!files.find(f => f.fileName === fileName)) {
    throw Error('Local File Not Found');
  }

  const result = await api.post(filePath, {
    command: 'select',
    print: true,
  });

  if (result.status !== 204) {
    throw Error('Failed to print');
  }

  return { success: true, file: filePath };
};
