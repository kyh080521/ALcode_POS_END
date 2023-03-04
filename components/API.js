import React, {useState} from "react";
import { TextInput, StyleSheet, View, Text, Button, FlatList} from 'react-native';
import axios from "axiaros";

const API = () => {
    const [prdnm, setPrdnm] = useState([]);
    const [data, setData] = useState('');
    const [saveText, setSaveText] = useState('');
    const [inputText, setInputText] = useState('');
    return (
        <View>
            <View style={styles.content}>
            <TextInput
                style={styles.testInput}
                onChangeText={(text) => {
                //this.setState({inputText: text});
                    setInputText(text);
                    setSaveText(text);
                    setInputText('');
                }}
                onSubmitEditing={async () => {
                    const BAR_CODE = saveText;
                    try {
                        const res = await axios.get(
                        'http://openapi.foodsafetykorea.go.kr/api/dc61c6e3c72645e19481/C005/xml/1/5/BAR_CD='+BAR_CODE
                        );
                        let resNumber = JSON.stringify(res);
                
                        let prdlstReportNo=resNumber.split("<PRDLST_REPORT_NO>")[1].split("</PRDLST_REPORT_NO>")[0];
                        
                        var a = '';
                        var nm = '';
                        var xhr = new XMLHttpRequest();
                        var url = 'http://apis.data.go.kr/B553748/CertImgListService/getCertImgListService'; /URL/
                        var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'4Es3IAYWvtEjQloH9aZivTA0FhZMzBQbDRsGvzwvSpWjQfBd%2BGkPTUj7TNeAltYbfnkZd%2BMPvvlwmdYPH%2FC%2BXw%3D%3D'; /Service Key/
                        queryParams += '&' + encodeURIComponent('prdlstReportNo') + '=' + encodeURIComponent(prdlstReportNo); //
                        queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml'); //
                        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); //
                        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
                        xhr.open('GET', url + queryParams);r
                        xhr.onreadystatechange = function () {
                            if (this.readyState == 4) {
                                a += (this.responseText).split("<prdlstNm>")[1].split("</prdlstNm>")[0].trim();
                                a += '&' + (this.responseText).split("<allergy>")[1].split("함유</allergy>")[0].trim();
                                a += '&' + prdlstReportNo;
                                a += '/';
                                nm=(this.responseText).split("<prdlstNm>")[1].split("</prdlstNm>")[0];
                                setData(data+a)
                                setPrdnm([...prdnm,nm])
                                alert(data)
                            }
                        };
                        
                        xhr.send('');
                    } catch (error) {
                        console.log(error);
                    }
                }}
                keyboardType='numeric'
                value={inputText}
                blurOnSubmit={false}
            />
            <FlatList
                style= {styles.itemlist}
                data= {prdnm}
                renderItem = {({item}) =>{
                    return (
                      <View>
                        <Text style={styles.item}>{item}</Text>
                      </View>
                    )
                  }}
                keyExtractor ={(item) => item.id}
            />
            </View>
            
            <Button
              title="NFC!!"
              onPress={() => 
                writeData = async () => {
                  try {
                      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
                      let resp = await NfcManager.requestTechnology(tech, {
                          alertMessage: 'Ready to do some custom Mifare cmd!'
                      });
          
                      let text = data
                      let fullLength = text.length + 7;
                      let payloadLength = text.length + 3;
          
                      let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;
          
                      resp = await cmd([0xA2, 0x04, 0x03, fullLength, 0xD1, 0x01]); // 0x0C is the length of the entry with all the fluff (bytes + 7)
                      resp = await cmd([0xA2, 0x05, payloadLength, 0x54, 0x02, 0x65]); // 0x54 = T = Text block, 0x08 = length of string in bytes + 3
          
                      let currentPage = 6;
                      let currentPayload = [0xA2, currentPage, 0x6E];
          
                      for(let i=0; i<text.length; i++){
                          currentPayload.push(text.charCodeAt(i));
                          if (currentPayload.length == 6){
                              resp = await cmd(currentPayload);
                              currentPage += 1;
                              currentPayload = [0xA2, currentPage];
                          }
                      }
          
                      // close the string and fill the current payload
                      currentPayload.push(254);
                      while(currentPayload.length < 6){
                          currentPayload.push(0);
                      }
          
                      resp = await cmd(currentPayload);
          
                      this._cleanUp();
                  } catch (ex) {
                      this._cleanUp();
                  }
              }}
             />
      </View>
        
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      height: 450,
      backgroundColor: "transparent",
    },
    testInput: {
      color: 'transparent',
    },
    itemlist: {
      textAlign: "left",
    },
    item: {
      fontSize: 18,
      backgroundColor: 'transparent',
    }
  });
export default API;