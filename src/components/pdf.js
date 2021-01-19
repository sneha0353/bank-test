import React,{useState,useEffect} from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    height:"100%",
    width:"100%"
  },
  section: {
    '@media max-width: 400': {
        width: 300,
      },
    margin: 170,
    height:100,
    width:200,
    padding: 10,
    flexGrow: 2
  }
});

// Create Document Component
const MyDocument = () => {
    const [values,setValues]=useState()
    useEffect(() => {
        setValues(JSON.parse(localStorage.getItem("profile")))
    }, [])
    return(
    <Document object-fit="fill"  style={{height:"100%"}}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Firstname:{values ? values.firstname : ""}</Text>
        <Text>Lastname:{values ? values.lastname : ""}</Text>
        <Text>DOB:{values ? values.dob.slice(0,10) :""}</Text>
        <Text>Mobile:{values ? values.mobile : ""}</Text>
        <Text>Address:{values ? values.address :""}</Text>
        <Text>Account Number:{values ? values.accnum :""}</Text>
        <Text>Pin:{values ? values.pin :""}</Text>
      </View>
    </Page>
  </Document>
)}
export default MyDocument