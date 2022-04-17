/**
 * StAuth10244: I Nguyen Duc Long, 000837437 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 * @returns 
 */
/**
 * @date April 15, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */


import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, onSnapshot, query, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDt7hYjTsAZVV-5xNoJOoSxNwf4eW0eaW4",
    authDomain: "educlong-react.firebaseapp.com",
    projectId: "educlong-react",
    storageBucket: "educlong-react.appspot.com",
    messagingSenderId: "874603796019",
    appId: "1:874603796019:web:368fad36770741eecf3546"
  };

const dbFirebase = getFirestore(initializeApp(firebaseConfig));
const _query = (data) => query(collection(dbFirebase, data));

/**
 * GET DATA FROM FIREBASE (Courses) 
 */
export const unSubscriber = (setDataParents, setLoading, parentData, arrChildData) => onSnapshot(_query(parentData), (querySnapshot) => {
  let data = [];
  querySnapshot.forEach((doc) => {
      if(arrChildData.length !== 0)
          arrChildData.forEach(dataChild => {
          let queryChild = query(collection(dbFirebase, parentData + '/' + doc.id + '/' + dataChild));
          onSnapshot(queryChild, (querySnapshotChild) => {
              let _dataChild = [];
              querySnapshotChild.forEach(docChild => {
                    _dataChild.push({...docChild.data(), id: docChild.id});
                });
                data.push({ ...doc.data(), dataChildrent: _dataChild, id: doc.id });
                setDataParents(data);
                if(data.length === querySnapshot._snapshot.docChanges.length) setLoading(false);
          })
      });
      else {
          data.push({ ...doc.data(), id: doc.id });
          setDataParents(data);
          if(data.length === querySnapshot._snapshot.docChanges.length) setLoading(false);
      }
  });
});
// export const onUpdate = (table, id) => onSnapshot(_query(table), (querySnapshot) => {
//     let datas = [];
//     querySnapshot.forEach((doc) => {
//         if(doc.id===id){
//             datas.push(doc.data());
//         }
//     });
//     console.log(datas[0])
//     updateDoc(doc(dbFirebase, table, id),{
//         isLike: !datas[0].isLike,
//     })
// });
