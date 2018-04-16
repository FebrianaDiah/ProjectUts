import React from 'react';
import { Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  List,
  ListItem,
  ActivityIndicator,
  Alert,
  RefreshControl} from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.header}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}> SISTEM PENDAFTARAN ANGGOTA </Text>
      </View>
      </View>
    );
  }
}

class Logo extends React.Component {
  render() {
    return (
      <View style={styles.header}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}> INPUT DATA ANGGOTA </Text>
      </View>
      </View>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <View style={styles.header}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}> EDIT DATA ANGGOTA </Text>
      </View>
      </View>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}> DATA ANGGOTA KMR 17 </Text>
      </View>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />
  };

  render() {
   return (
        <View style={styles.containerMain}>
         <View style={styles.box1}>
         <View style={styles.button1}>
         <Image source={require('./src/images/awal2.png')}	style={styles.icon1}	/>
         </View>
         <Text style = {{padding: 15, fontSize: 26, fontWeight: 'bold', textAlign: 'center'}} > Komunitas Matic Ring 17 {"\n"} Zone Karangasem Bali </Text>
         <View>
           <View style={{margin:10}} >
             <Button
               title="DAFTAR ANGGOTA"
               color="#7E57C2"
               onPress={() => this.props.navigation.navigate('Details')}
             />
           </View>
         </View>
         <View>
           <View style={{margin:10}} >
             <Button
               title="DATA ANGGOTA"
               color="#7E57C2"
               onPress={() => this.props.navigation.navigate('ListData')}
             />
           </View>
         </View>
         </View>

         <View style={styles.footer}>
          <Text style={{ padding: 30, fontSize: 15, color: 'black', textAlign: 'center' }}>
          &copy; @febryana_dyah</Text>
         </View>
       </View>
      );
    }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Logo />
  };
  constructor() {
      super();
      this.state = {
        nama: '',
        umur: '',
        alamat: '',
        hp: '',
        ActivityIndicator_Loading: false,
      };
    }

    Insert_Data_Into_MySQL = () =>
      {
          this.setState({ ActivityIndicator_Loading : true }, () =>
          {
            //mengirim data ke database melalui api
              fetch('http://febrianadiah1105.000webhostapp.com/febrianadiah1105/kirimData.php',
              {
                  method: 'POST',
                  headers:
                  {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(
                  {
                    nama : this.state.nama,
                    umur : this.state.umur,
                    alamat : this.state.alamat,
                    hp : this.state.hp,
                  })

              }).then((response) => response.json()).then((responseJsonFromServer) =>
              {
                  alert(responseJsonFromServer);
                  this.setState({ ActivityIndicator_Loading : false });
              }).catch((error) =>
              {
                  console.error(error);
                  /*Alert.alert(
                    'Oops!',
                    'Something went wrong!',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )*/
                  this.setState({ ActivityIndicator_Loading : false});
              });
          });
      }

  render() {
    return (
      <View style={styles.containerMain}>
       <View style={styles.box2}>
       <View style={styles.button4}>
       <Image source={require('./src/images/input.png')}	style={styles.icon3}	/>
       </View>
        <View>
        <Text style={{textAlign: 'left'}}>NAMA</Text>
          <TextInput style={styles.text}
            placeholder="Masukan Nama"
            onChangeText={(nama) => this.setState({ nama })}
            keyboardType='ascii-capable'
          />

          <Text style={{textAlign: 'left'}}>UMUR</Text>
            <TextInput style={styles.text}
              placeholder="Masukan Umur"
              onChangeText={(umur) => this.setState({ umur })}
              keyboardType='numeric'
            />

          <Text style={{textAlign: 'left'}}>ALAMAT</Text>
          <TextInput style={styles.text}
            placeholder="Masukan Alamat"
            onChangeText={(alamat) => this.setState({ alamat })}
            keyboardType='ascii-capable'
          />

          <Text style={{textAlign: 'left'}}>NO HANDPHONE</Text>
          <TextInput style={styles.text}
            placeholder="Masukan No Handphone"
            onChangeText={(hp) => this.setState({ hp })}
            keyboardType='numeric'
          />
        </View>


        <View>
        {
          this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#7E57C2' size='large'style={styles.ActivityIndicatorStyle} /> : null
        }
          <View style={{margin:5, flexDirection: 'row'}} >
          <View style={{marginRight: 10, marginBottom:5}}>
            <Button
              onPress={() => this.Insert_Data_Into_MySQL()}
              title="Simpan"
              color="#7E57C2"
            />
          </View>
          <View style={{marginLeft:10, marginBottom:5}} >
            <Button
              title="Lihat"
              color="#7E57C2"
              onPress={() => this.props.navigation.navigate('ListData')}
            />
          </View>
          </View>
        </View>
        </View>
        <View style={styles.footer}>
         <Text style={{ padding: 30, fontSize: 15, color: 'black', textAlign: 'center' }}>
         &copy; @febryana_dyah</Text>
        </View>
      </View>
    );
  }
}

class EditScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Title />
  };
  constructor(props) {
      super(props);
      this.state = {
        nama: '',
        umur: '',
        alamat: '',
        hp: '',
        ActivityIndicator_Loading: false,
      };
    }

    componentDidMount()  {
      this.setState({
          nama: this.props.navigation.state.params.nama,
          umur: this.props.navigation.state.params.umur,
          alamat: this.props.navigation.state.params.alamat,
          hp: this.props.navigation.state.params.hp,
        })
       }

    UpdateRecord = () =>{
        this.setState({ ActivityIndicator_Loading : true }, () =>
          {
              fetch('http://febrianadiah1105.000webhostapp.com/febrianadiah1105/updateData.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                nama : this.state.nama,
                umur : this.state.umur,
                alamat: this.state.alamat,
                hp: this.state.hp,

              })

              }).then((response) => response.json())
                  .then((responseJson) => {
                    this.setState({ ActivityIndicator_Loading : false });
                    // Showing response message coming from server updating records.
                    Alert.alert(responseJson);

                  }).catch((error) => {
                    console.error(error);
                    this.setState({ ActivityIndicator_Loading : false });
                  });
          });
        }

        DeleteRecord = () =>{
             this.setState({ ActivityIndicator_Loading : true }, () =>
             {
               fetch('http://febrianadiah1105.000webhostapp.com/febrianadiah1105/deleteData.php', {
               method: 'POST',
               headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               },
               body: JSON.stringify({

                 hp : this.state.hp

               })

               }).then((response) => response.json())
               .then((responseJson) => {
                 this.setState({ ActivityIndicator_Loading : false });
                 // Menampilkan pesan yang ada di query
                 Alert.alert(responseJson);
                 this.props.navigation.navigate('ListData');

               }).catch((error) => {
                  console.error(error);
                  this.setState({ ActivityIndicator_Loading : false });
               });
               });
           }

  render() {
    return (
      <View style={styles.containerMain}>
       <View style={styles.box2}>
       <View style={styles.button4}>
       <Image source={require('./src/images/input.png')}	style={styles.icon3}	/>
       </View>
        <View>
        <Text style={{textAlign: 'left'}}>NAMA</Text>
          <TextInput style={styles.text}
            placeholder="Masukan Nama"
            value={this.state.nama}
            onChangeText={(nama) => this.setState({ nama })}
            keyboardType='ascii-capable'
          />

          <Text style={{textAlign: 'left'}}>UMUR</Text>
            <TextInput style={styles.text}
              placeholder="Masukan Umur"
              value={this.state.umur}
              onChangeText={(umur) => this.setState({ umur })}
              keyboardType='numeric'
            />

          <Text style={{textAlign: 'left'}}>ALAMAT</Text>
          <TextInput style={styles.text}
            placeholder="Masukan Alamat"
            value={this.state.alamat}
            onChangeText={(alamat) => this.setState({ alamat })}
            keyboardType='ascii-capable'
          />

          <Text style={{textAlign: 'left'}}>NO HANDPHONE</Text>
          <TextInput style={styles.text}
            placeholder="Masukan No Handphone"
            value={this.state.hp}
            onChangeText={(hp) => this.setState({ hp })}
            keyboardType='numeric'
          />
        </View>


        <View>
          <View style={{margin:5, flexDirection: 'row'}} >
          <View style={{marginRight: 10, marginBottom:5}}>
            <Button
              onPress={() => this.UpdateRecord()}
              title="Edit"
              color="#7E57C2"
            />
          </View>
          {
            this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#7E57C2' size='large'style={styles.ActivityIndicatorStyle} /> : null
          }
          <View style={{marginLeft: 10, marginBottom:5}}>
          <Button
            onPress={() => this.DeleteRecord()}
            title="Hapus"
            color="#7E57C2"
          />
          </View>

          <View style={{marginLeft: 10, marginBottom:5}}>
          <Button
            title="Lihat"
            color="#7E57C2"
            onPress={() => this.props.navigation.navigate('ListData')}
          />
          </View>

          </View>
        </View>
        </View>

        <View style={styles.footer}>
         <Text style={{ padding: 30, fontSize: 15, color: 'black', textAlign: 'center' }}>
         &copy; @febryana_dyah</Text>
        </View>
      </View>
    );
  }
}

class ListDataScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Header />
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false,
    };
  }

  GetIDFunction=(nama, umur, alamat, hp)=>{
            this.props.navigation.navigate('Edit', {
              nama : nama,
              umur : umur,
              alamat : alamat,
              hp : hp,
            });
          }

  componentDidMount()  {
      const url = 'http://febrianadiah1105.000webhostapp.com/febrianadiah1105/getData.php';
       this.setState({ loading: true });
      fetch (url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("comp");
        console.log(responseJson);
        this.setState({
          data: responseJson,
          error: responseJson.error || null,
          loading: false,
          refreshing: false,
          ActivityIndicator_Loading: false
        });
      }
    );
  }

  render() {
    return (
      <View style={{margin: 25, justifyContent:'center', backgroundColor: '#EDE7F6'}}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) =>
            <View style={styles.ListItem}>
            <Text>Nama {"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}: {item.nama}</Text>
            <Text>Umur {"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}: {item.umur} tahun</Text>
            <Text>Alamat {"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}: {item.alamat}</Text>
            <Text>No Handphone {"\t"}: {item.hp}</Text>

            <View style={{margin:5,justifyContent: 'center'}} >
            {
              this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#7E57C2' size='large'style={styles.ActivityIndicatorStyle} /> : null
            }
              <View style={{marginTop:10, marginBottom:5}} >
                <Button
                  title="Edit"
                  color="#7E57C2"
                  onPress={this.GetIDFunction.bind(
                           this, item.nama,
                            item.umur,
                            item.alamat,
                            item.hp,
                            )}
                />
              </View>
              </View>
            </View>
        }
        keyExtractor={item => item.nama}
        />
        <View>
        <View style={{backgroundColor:'#f4eff3'}}>
         <View style={{margin:10}} >
            <Button
             title="Home"
             color="#7E57C2"
             onPress={() => this.props.navigation.navigate('Home')}
           />
         </View>
         </View>
     </View>
      </View>
    );
  }
}
const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    ListData: {
      screen: ListDataScreen,
    },
    Edit: {
      screen: EditScreen,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#EDE7F6',
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    flex: 1,
    backgroundColor: '#9575CD',
  },
  box1: {
    flex: 3,
    margin: 20,
    flexDirection: 'column',
    backgroundColor: '#B39DDB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box2: {
    flex: 3,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'column',
    backgroundColor: '#B39DDB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box3: {
    flex: 0.4,
    //marginLeft: 25,
    //marginRight: 25,
    marginBottom: 10,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#F3E5F5',
  },
  footer: {
    flex: 0.3,
    backgroundColor: '#9575CD',
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon1: {
    height: 200,
    width: 200,
  },
  icon2: {
    height: 80,
    width: 80,
  },
  icon3: {
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button1: {
    height: 200,
    width: 200,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button2: {
    height: 50,
    width: 250,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  button3: {
    height: 150,
    width: 200,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  button4: {
    height: 90,
    width: 90,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    height: 40,
    width: 300,
    textAlign: 'center',
    backgroundColor: 'white',
    margin: 20
  },
  image: {
    backgroundColor: '#B39DDB',
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ListItem: {
    backgroundColor:'#B39DDB',
    padding: 10,
    marginTop: 5,
    flex: 1
  },
  ActivityIndicatorStyle:{
    position: 'absolute',
    left: 5,
    right: 5,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
