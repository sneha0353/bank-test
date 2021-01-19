import React from 'react';
import MyDocument from "./pdf"
import { PDFViewer } from '@react-pdf/renderer';

const PDFView = () => (
  <PDFViewer style={{height:"100%"}}>
    <MyDocument style={{height:"100%"}} />
  </PDFViewer>
);

export default PDFView;
