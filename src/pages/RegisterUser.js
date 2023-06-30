import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  let [nama, setNama] = useState('');
  let [golongan, setGolongan] = useState('');
  let [jabatan, setJabatan] = useState('');
  let [nilai_kinerja, setNilaiKinerja] = useState('');

  let register_user = () => {
    console.log(nama, golongan, jabatan, nilai_kinerja);

    if (!nama) {
      alert('Silakan isi nama terlebih dahulu !');
      return;
    }
    if (!golongan) {
      alert('Silakan isi golongan terlebih dahulu !');
      return;
    }
    if (!jabatan) {
      alert('Silakan isi jabatan terlebih dahulu !');
      return;
    }
    if (!nilai_kinerja) {
      alert('Silakan isi nilai kinerja terlebih dahulu !');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_pegawai (nama, golongan, jabatan, nilai_kinerja) VALUES (?,?,?,?)',
        [nama, golongan, jabatan, nilai_kinerja],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sukses',
              'Berhasil Menambahkan Data !!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Gagal Menambahkan Data, Coba Lagi !!');
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
              <Mytextinput
                placeholder="Nama Pegawai"
                onChangeText={
                  (nama) => setNama(nama)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Golongan"
                onChangeText={
                  (golongan) => setGolongan(golongan)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Jabatan"
                onChangeText={
                  (jabatan) => setJabatan(jabatan)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Nilai Kinerja"
                onChangeText={
                  (nilai_kinerja) => setNilaiKinerja(nilai_kinerja)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mybutton title="Simpan" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;