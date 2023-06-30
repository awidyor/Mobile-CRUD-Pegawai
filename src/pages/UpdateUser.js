import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Image,
  Text,
} from 'react-native';

import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const UpdateUser = ({ navigation }) => {
  let [inputid_pegawai, setid_pegawai] = useState('');
  let [nama, setNama] = useState('');
  let [golongan, setGolongan] = useState('');
  let [jabatan, setJabatan] = useState('');
  let [nilai_kinerja, setNilaiKinerja] = useState('')

  let updateAllStates = (nama, golongan, jabatan, nilai_kinerja) => {
    setNama(nama);
    setGolongan(golongan);
    setJabatan(jabatan);
    setNilaiKinerja(nilai_kinerja)
  };

  let searchUser = () => {
    console.log(inputid_pegawai);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_pegawai where id_pegawai = ?',
        [inputid_pegawai],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.nama,
              res.golongan,
              res.jabatan,
              res.nilai_kinerja
            );
          } else {
            alert('Usuário não encontrado!');
            updateAllStates('', '', '', '');
          }
        }
      );
    });
  };
  let updateUser = () => {
    console.log(inputid_pegawai, nama, golongan, jabatan, nilai_kinerja);

    if (!inputid_pegawai) {
      alert('Masukkan ID Pegawai !');
      return;
    }
    if (!nama) {
      alert('Masukan Nama !');
      return;
    }
    if (!golongan) {
      alert('Masukan Golongan!');
      return;
    }
    if (!jabatan) {
      alert('Masukan Jabatan!');
      return;
    }
    if (!nilai_kinerja) {
      alert('Masukan Nilai Kinerja!');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_pegawai set nama=?, golongan=? , jabatan=?, nilai_kinerja=? where id_pegawai=?',
        [nama, golongan, jabatan, nilai_kinerja, inputid_pegawai],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Usuário atualizado com sucesso !!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao atualizar o usuário');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <View><Image source={require('./image/logo.jpg')} style={{height: 90, width: 150}}></Image></View>
              <Mytext text="Cari Berdasarakan ID" />
              <Mytextinput
                placeholder="Masukan ID!"
                style={{ padding: 10 }}
                onChangeText={
                  (inputid_pegawai) => setid_pegawai(inputid_pegawai)
                }
              />
              <Mybutton
                title="Cari!"
                customClick={searchUser}
              />
              <Mytextinput
                placeholder="Masukan Nama"
                value={nama}
                style={{ padding: 10 }}
                onChangeText={
                  (nama) => setNama(nama)
                }
              />
              <Mytextinput
                placeholder="Masukan Golongan"
                value={'' + golongan}
                onChangeText={
                  (golongan) => setGolongan(golongan)
                }
                maxLength={15}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={jabatan}
                placeholder="Masukan Jabatan!"
                onChangeText={
                  (jabatan) => setJabatan(jabatan)
                }
                maxLength={15}
                style={{padding: 10 }}
              />
              <Mytextinput
                value={'' + nilai_kinerja}
                placeholder="Masukan Nilai Kinerja"
                onChangeText={
                  (nilai_kinerja) => setNilaiKinerja(nilai_kinerja)
                }
                maxLength={225}
                style={{padding: 10 }}
              />
              <Mybutton
                title="Update"
                customClick={updateUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;