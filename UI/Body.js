import React, {useState, useEffect} from 'react';
import { TextInput, StyleSheet, View, Text, FlatList, Image, Modal,TouchableOpacity, ScrollView} from 'react-native';
import axios from "axios";
import QRCode from 'react-native-qrcode-svg';
import QRIcon from '../assets/QR-icon-removebg.png';

const Body = () => {
    let now = new Date();
    const month = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'nomember', 'december'];
    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const timeWhat = ['AM', 'PM'];
    const [date, setDate] = useState('');
    const [time, setTime] = useState();
    var todayYear;
    var todayMonth;
    var todayDate;
    var dayOfWeek;

    var todayHours ;
    var todayMinutes;
    var currnetSecond ;

    let pa;

    useEffect(() => {  
        setInterval(() => {
            todayYear = now.getFullYear();
            todayMonth = month[now.getMonth()];
            todayDate = now.getDate();
            dayOfWeek = week[now.getDay()];
            todayHours = now.getHours();
            todayMinutes = now.getMinutes();
            currnetSecond = now.getSeconds();
            pa;
            if (todayHours < 12) pa = timeWhat[0];
            else {
                pa = timeWhat[1]
            }
        }, 60000);
        setDate(dayOfWeek + ',  ' + todayMonth + " "+ todayDate  + ',  ' + todayYear);
        setTime(todayHours + ':' + todayMinutes + ' ' + pa);
        console.log(currnetSecond);
      }, [date]);

    const [prdnm, setPrdnm] = useState([]); //상품 이름
    const [data, setData] = useState(' '); // NFC에 보낼 정보 (알러지 정보, 상품 이름) 
    const [saveText, setSaveText] = useState(''); //가장 최근에 찍힌 상품 고유번호
    const [inputText, setInputText] = useState(''); //바코드를 찍으면 InputText에 들어온 후 
    const [modalVisible, setmodalVisible] = useState(false);

    return (
        <View style = {styles.body}>
            <Modal
                style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%) !important'}}
                animationType='fade'
                transparent={true}
                onRequestClose={()=>setmodalVisible(false)}
                visible={modalVisible}               
            >
                <TouchableOpacity 
                    style={{flex:1 ,alignItems: 'center', justifyContent: 'center', backgroundColor:'#00000069'}} 
                    activeOpacity={1} 
                    onPressOut={() => {setmodalVisible(false)}}
                >
                    <View  style={{padding:50 , backgroundColor:'#fff', borderRadius: 10}}>
                        <QRCode
                            size= {300}
                            value = {data}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
            <View style = {styles.item1}>
                <View style={styles.content}>
                    <View style = {styles.itemHead}>
                        <View style = {styles.itmeHeadState}>
                           <View style = {styles.mallInformView}>
                                <Text style = {styles.itmeHeadText1}>STATE</Text>
                                <Text style = {{ color : '#A49D9D', fontSize : 20 }}>STATION</Text>
                           </View>
                           <View>
                                <Text style = {styles.itmeHeadText2}>1234</Text>
                                <Text style = {{ color : 'black', fontSize : 20}}>GS20000</Text>
                           </View>
                        </View>
                        <View style = {styles.itmeHeadState}>
                           <View>
                                <Text>{date}</Text>
                                <Text>{time}</Text>
                           </View>
                        </View>
                    </View>
                    <TextInput
                        style={styles.testInput}
                        onChangeText={(text) => {
                        //this.setState({inputText: text});
                            setInputText(text);
                            setSaveText(text);
                            setTimeout(()=>{ setInputText('') }, 650);
                        }}

                        onSubmitEditing={async () => {
                            const BAR_CODE = saveText;
                            try {
                                const res = await axios.get(
                                    'https://world.openfoodfacts.org/product/'+BAR_CODE 
                                );
                                let nm = res.data.split("<title>")[1].split('</title>')[0].trim();
                                let a= nm + '&' + res.data.split("Allergens:</strong>")[1].split('</div>')[0].trim() + '/';
                                setData(data+a)
                                setPrdnm([...prdnm,nm])
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
                    <View style = {styles.itemFoot}>
                        <View style = {styles.productNumView}>
                            <View style = {{
                                flexDirection : 'row',}}
                            >
                                <Text>Num of Product : </Text>
                                <Text>{prdnm.length}</Text>
                            </View>
                            <View></View>
                            <View></View>
                        </View>
                        <View style = {styles.grayBarView}></View>
                        <View style = {styles.totalView}></View>
                    </View>
                </View>           
            </View>
            <View style={styles.item2}>                          
                <View style = {styles.QRView}>
                    <TouchableOpacity
                        onPressOut={()=>setmodalVisible(true)}
                        style = {{
                            flex : 1,
                        }}
                    >
                        <View style = {{
                            flex : 1,
                            flexDirection : 'column',
                            backgroundColor : '',
                            alignItems : 'center',
                            justifyContent : 'center',
                            backgroundColor : 'grey'
                        }}>
                            <Image
                                style = {{
                                    height : 100,
                                    width : 100,
                                }}
                                source={QRIcon}
                            />
                            <Text style = {{
                                color : 'white',
                                fontSize : 30
                            }}>QR</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style = {styles.ETCView}>
                    <View style = {{
                            flex : 1.1,
                            flexDirection : 'column',
                            backgroundColor : 'white'
                    }}>
                        <View style = {{
                            flex : 1,
                            backgroundColor : '#ff8c02',
                            alignItems : 'center',
                            justifyContent : 'center',
                            marginBottom : 3,
                        }}>
                            <Text style = {{
                                fontSize: 15,
                                color : 'red',
                            }}>
                                        0
                            </Text>
                            <Text style = {{
                                color : 'white',
                                fontSize : 10
                            }}>
                                Hold/Order
                            </Text>
                        </View>
                        <View style = {{
                            flex : 1,
                            backgroundColor : '#ff8c02',
                            alignItems : 'center',
                            justifyContent : 'center',
                            marginBottom : 3,
                        }}>
                            <Text style = {{
                                color : 'white',
                                fontSize : 10
                            }}>
                                Hold/Order List
                            </Text>
                        </View>
                        <View style = {{
                            flex : 1,
                            backgroundColor : '#ad193d',
                            alignItems : 'center',
                            justifyContent : 'center',
                            marginBottom : 3,
                        }}>
                            <Text style = {{
                                color : 'white',
                                fontSize : 17
                            }}>
                                Qty
                            </Text>
                        </View>
                        <View style = {{
                            flex : 1,
                            backgroundColor : '#6ac1f1',
                            alignItems : 'center',
                            justifyContent : 'center',
                            marginBottom : 3,
                        }}>
                            <Text style = {{
                                color : 'white',
                                fontSize : 13
                            }}>
                                Disc(All)
                            </Text>
                        </View>
                        <View style = {{
                            flex : 1,
                            backgroundColor : '#6ac1f1',
                            alignItems : 'center',
                            justifyContent : 'center',
                            marginBottom : 3,
                        }}>
                            <Text style = {{
                                color : 'white',
                                fontSize : 15
                            }}>
                                %(All)
                            </Text>
                        </View>
                    </View>
                    <View style = {{
                            flex : 3,
                            flexDirection : 'column',
                            //backgroundColor : 'red'
                            backgroundColor : '#f4f4f4', 
                            marginBottom : 3
                    }}>
                       <View style = {{
                            flex : 1,
                            flexDirection : 'row',
                            marginLeft : 3,
                       }}>
                            <View style = {{
                                backgroundColor : '#767676',
                                alignItems : 'center',
                                justifyContent : 'center',
                                flex:1
                            }}>
                                <Text style = {{
                                    color : 'white',
                                    fontSize : 10
                                }}>
                                    Open Drawer
                                </Text>
                            </View>
                            <View style = {{
                                backgroundColor : '#b0b0b0',
                                alignItems : 'center',
                                justifyContent : 'center',
                                flex : 1,
                                marginLeft : 3,
                            }}>
                                <Text style = {{
                                    color : 'black',
                                    fontSize : 25,
                                }}>
                                    CE
                                </Text>
                            </View>
                            <View style = {{
                                backgroundColor : '#b0b0b0',
                                alignItems : 'center',
                                justifyContent : 'center',
                                flex : 1,
                                marginLeft : 3,
                            }}>
                                <Text style = {{
                                    color : 'black',
                                    fontSize : 25,
                                }}>
                                    C
                                </Text>
                            </View>
                       </View>
                       <View style = {{
                             flex : 1,
                             flexDirection : 'row',
                             marginBottom : 3
                       }}>
                            <View style = {{
                                flex : 1,
                                flexDirection : 'row',
                                alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#ffffff',
                                marginLeft : 3,
                            }}>
                                <Text style ={{
                                    marginLeft : 2,
                                    fontSize : 20,
                                 }}>
                                    7
                                </Text>
                            </View>
                            <View style = {{
                                flex : 1,
                                flexDirection : 'row',
                                alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#ffffff',
                                marginLeft : 3,
                            }}>
                                    <Text style = {{
                                        marginLeft : 2,
                                        fontSize : 20,
                                    }}>
                                        8
                                    </Text>
                            </View>
                            <View style = {{
                                flex : 1,
                                flexDirection : 'row',
                                alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#ffffff',
                                marginLeft : 3,
                            }}>
                                    <Text style = {{
                                        marginLeft : 2,
                                        fontSize : 20,
                                    }}>
                                        9
                                    </Text>
                            </View>
                       </View>
                       <View style = {{
                             flex : 1,
                             flexDirection : 'row',
                             marginBottom : 3
                       }}>
                            <View style = {{
                                flex : 1,
                                flexDirection : 'row',
                                alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#ffffff',
                                marginLeft : 3,
                            }}>
                                <Text style ={{
                                    marginLeft : 2,
                                    fontSize : 20,
                                 }}>
                                    4
                                </Text>
                            </View>
                            <View style = {{
                                flex : 1,
                                flexDirection : 'row',
                                alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#ffffff',
                                marginLeft : 3,
                            }}>
                                    <Text style = {{
                                        marginLeft : 2,
                                        fontSize : 20,
                                    }}>
                                        5
                                    </Text>
                            </View>
                            <View style = {{
                                flex : 1,
                                flexDirection : 'row',
                                alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#ffffff',
                                marginLeft : 3,
                            }}>
                                    <Text style = {{
                                        marginLeft : 2,
                                        fontSize : 20,
                                    }}>
                                        6
                                    </Text>
                            </View>
                       </View>
                       <View style = {{
                             flex : 1,
                             flexDirection : 'row',
                             marginBottom : 3
                       }}>
                            <View style = {{
                                flex : 1,
                                flexDirection : 'row',
                                alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#ffffff',
                                marginLeft : 3,
                            }}>
                                <Text style ={{
                                    marginLeft : 2,
                                    fontSize : 20,
                                 }}>
                                    1
                                </Text>
                            </View>
                            <View style = {{
                                flex : 1,
                                flexDirection : 'row',
                                alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#ffffff',
                                marginLeft : 3,
                            }}>
                                    <Text style = {{
                                        marginLeft : 2,
                                        fontSize : 20,
                                    }}>
                                        2
                                    </Text>
                            </View>
                            <View style = {{
                                flex : 1,
                                flexDirection : 'row',
                                alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#ffffff',
                                marginLeft : 3,
                            }}>
                                    <Text style = {{
                                        marginLeft : 2,
                                        fontSize : 20,
                                    }}>
                                        3
                                    </Text>
                            </View>
                       </View>
                       <View style = {{
                             flex : 1,
                             flexDirection : 'row',
                       }}>
                            <View style = {{
                                flex : 1,
                                flexDirection : 'row',
                                alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#ffffff',
                                marginLeft : 3,
                            }}>
                                <Text style ={{
                                    marginLeft : 2,
                                    fontSize : 20,
                                 }}>
                                    0
                                </Text>
                            </View>
                            <View style = {{
                                flex : 1,
                                flexDirection : 'row',
                                alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#ffffff',
                                marginLeft : 3,
                            }}>
                                    <Text style = {{
                                        marginLeft : 2,
                                        fontSize : 20,
                                    }}>
                                        00
                                    </Text>
                            </View>
                            <View style = {{
                                flex : 1,
                                flexDirection : 'row',
                                alignItems : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#ffffff',
                                marginLeft : 3,
                            }}>
                                    <Text style = {{
                                        marginLeft : 2,
                                        fontSize : 20,
                                    }}>
                                        .
                                    </Text>
                            </View>
                       </View>
                       
                    </View>

                    <View style = {{
                            flex : 1.6,
                            flexDirection : 'column',
                            marginLeft : 2,
                    }}>
                        <View style = {{
                            backgroundColor : '#ad193d',
                            flex: 2,
                            justifyContent : 'center',
                            alignItems : 'center',
                        }}>
                            <Text style = {{
                                color : 'white',
                                fontSize : 12,
                            }}>
                                Show Total
                            </Text>
                        </View>
                        <View style = {{
                            flex: 3,
                            justifyContent : 'center',
                            alignItems : 'center',
                            backgroundColor: "#018b01",
                            marginTop : 3
                        }}>
                            <Text style = {{
                                color : 'white',
                                fontSize : 10,
                                justifyContent : 'center',
                                alignItems : 'center'
                            }}>
                                Other Payment
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPressOut={()=>{
                                setPrdnm([]);
                                setData('');
                                setInputText('');
                                setSaveText('');
                            }}
                            style = {{
                                backgroundColor: "#018b01",
                                flex : 5,
                                flexDirection : 'column',
                                alignItems: 'center',
                                justifyContent : 'center',
                                marginTop : 3,  
                            }}>
                            <View style = {{
                            }}>
                                    <Text style = {styles.iButtonText}>CASH</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    body: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft : 5,
        paddingRight : 5,
        paddingBottom : 5,
    },

    item1: {
        flex: 7,
        flexDirection: 'column',
        backgroundColor: 'F0EBEB',
        paddingRight : 5,
    },


    itemHead: {
        flex: 0.3,
        flexDirection : 'row',
        //backgroundColor : 'red'
        backgroundColor: '#FFFFFF'
    },
    itmeHeadState: {
        flexDirection : 'row',
        paddingRight: 50,
    },
    mallInformView: {
        paddingRight: 10
    },
    itmeHeadText1: {
        paddingBottom : 5,
        color : '#A49D9D',
        fontSize : 20
    },
    itmeHeadText2: {
        paddingBottom : 5,
        color : 'black',
        fontSize : 20,
    },
    item2: {
        flex: 5,
    },
    QRView: {
        flex: 1,
        marginBottom : 5,
    },
    ETCView: {
        flex: 1.1,
        flexDirection : 'row',
    },

    itemlist: {
        textAlign: "left",
        width : '100%',
        flex: 20,
        backgroundColor: '#FFFFFF'
        //backgroundColor: 'blue',
    },
    itemFoot: {
        flex:1,
        flexDirection : 'column',
        //backgroundColor : 'pink',
        backgroundColor: '#FFFFFF'
    },
    productNumView:{
        flex:0.1,
        flexDirection : 'row',
    },
    grayBarView: {
        backgroundColor: '#606060',
        flex:0.2,
    },
    totalView: {
        flex:0.27,
        backgroundColor: 'white',
        flexDirection : 'row',
    },

    iKeypad: {
        height: 400,
        width : 260,
        marginTop : 5,
        marginBottom : 5,
        paddingLeft : 3,
        paddingRight : 3,
    },
    iAdvertise: {
        height: 100,
        width : 270,
        paddingLeft : 6,
        paddingRight: 6,
    },   
    iButtonBox: {
        marginBottom: 5,
        padding: 5,
        paddingBottom: 20,
        paddingTop : 20,
        backgroundColor: "#68C2FF",
        alignItems: 'center',
        fontWeight: 10,
    },
    iButtonText: {
        color: 'white',
        fontSize: 15,
    },
    iButton: {
        padding: 5,
    },
    NFCButton: {
        height: 25,
        backgroundColor: 'green',
    },
    buyButton: {
        height : 50,
        backgroundColor : 'red',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex : 1,
    },
    testInput: {
        color: 'transparent',
        height:5,
    },
    item: {
        fontSize: 40,
        color: 'black',
        marginBottom : 8,
    },

})

export default Body;