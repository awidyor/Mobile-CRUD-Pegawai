import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, Image } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_pegawai',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.id_pegawai}
        style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
        <Text style={styles.textheader}>ID Pegawai</Text>
        <Text style={styles.textbottom}>{item.id_pegawai}</Text>

        <Text style={styles.textheader}>Nama Pegawai</Text>
        <Text style={styles.textbottom}>{item.nama}</Text>

        <Text style={styles.textheader}>Golongan</Text>
        <Text style={styles.textbottom}>{item.golongan}</Text>

        <Text style={styles.textheader}>Jabatan</Text>
        <Text style={styles.textbottom}>{item.jabatan}</Text>

        <Text style={styles.textheader}>Nilai Kinerja</Text>
        <Text style={styles.textbottom}>{item.nilai_kinerja}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View><Image source={require('./image/logo.jpg')} style={{height: 90, width: 150}}></Image></View>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',
  },
  textbottom: {
    color: '#111',
    fontSize: 18,
  },
});

export default ViewAllUser;