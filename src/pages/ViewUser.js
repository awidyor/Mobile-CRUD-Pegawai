import React, { useState } from 'react';
import { Text, View, SafeAreaView, Image } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  let [inputNama, setInputNama] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputNama);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_pegawai where nama = ?',
        [inputNama],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('Data tidak ditemukan !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View><Image source={require('./image/logo.jpg')} style={{height: 90, width: 150}}></Image></View>
          <Mytext text="Cari Data Pegawai" />
          <Mytextinput
            placeholder="Masukkan Nama Pegawai"
            onChangeText={
              (inputNama) => setInputNama(inputNama)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Cari Data" customClick={searchUser} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>ID Pegawai : {userData.id_pegawai}</Text>
            <Text>Nama : {userData.nama}</Text>
            <Text>Golongan : {userData.golongan}</Text>
            <Text>Jabatan : {userData.jabatan}</Text>
            <Text>Nilai Kinerja : {userData.nilai_kinerja}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;