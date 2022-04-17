var express = require('express');
var router = express.Router();

// const firebase = require("firebase");
const { initializeApp } = require('firebase/app');
const { collection, getFirestore, onSnapshot, query, doc, updateDoc } =  require("firebase/firestore");
// const express = require('express');
// var router = express.Router();
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


/* GET courses, partners, reasons, team, feedbacks. */
router.get('/:parentData/', function(req, res, next) {
    onSnapshot(_query(req.params.parentData), (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });       
        res.send(data);
    });
});
module.exports = router;
