import React, { useEffect } from 'react';
import { View, SafeAreaView, Image, Text } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_pegawai'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_pegawai', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_pegawai(id_pegawai INTEGER PRIMARY KEY AUTOINCREMENT, nama VARCHAR(15) NOT NULL, golongan INT(11), jabatan VARCHAR(15), nilai_kinerja INT(11))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <View><Image source={require('./image/logo.jpg')} style={{height: 150, width: 250}}></Image>
            <Text style={{fontSize: 35, alignSelf: 'center', fontWeight: 'bold', marginBottom: 20, color: '' }}> DATA KEPEGAWAIAN</Text>
            </View>
            <MyImageButton
              title="Tambah Data"
              btnColor='#FF0000'
              btnIcon="user-plus"
              customClick={() => navigation.navigate('Register')}
            />

            <MyImageButton
              title="Update Data"
              btnColor='#FF0000'
              btnIcon="user-circle"
              customClick={() => navigation.navigate('Update')}
            />

            <MyImageButton
              title="Lihat Data"
              btnColor='#FF0000'
              btnIcon="user"
              customClick={() => navigation.navigate('View')}
            />
            <MyImageButton
              title="Lihat Semua Data"
              btnColor='#FF0000'
              btnIcon="users"
              customClick={() => navigation.navigate('ViewAll')}
            />
            <MyImageButton
              title="Hapus Data"
              btnColor='#FF0000'
              btnIcon="user-times"
              customClick={() => navigation.navigate('Delete')}
            />
            <View><Image source={require('./image/sv.png')} style={{height: 100, width: 250, alignSelf: 'center', marginTop: 40}}></Image></View>
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;