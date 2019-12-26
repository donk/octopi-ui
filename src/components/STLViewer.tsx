/* global Madeleine */
import React, { useEffect } from 'react';
declare const Madeleine: any;

const STLViewer = () => {

   useEffect(() => {
    console.log('Madeleine init');
    var tst = new Madeleine({
      target: 'target',
      data: './models/pikachu.stl',
    });
    console.log(tst);
   }, []);

   return <div id="target"></div>;
};

export default STLViewer;
