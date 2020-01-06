import React, { useEffect } from 'react';
declare const Madeleine: any;

const STLViewer = () => {

   useEffect(() => {


   var madeleine = new Madeleine({
      target: 'target',
      data: './models/pikachu.stl'
    });
    madeleine.adaptViewerTheme('soft');
   }, []);

   return <div id="target"></div>;
};

export default STLViewer;
