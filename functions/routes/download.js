var express = require('express');
var router  = express.Router();
var ytdl    = require('ytdl-core');
//var fs      = require('fs');

router.get('/', (req, res, next) => {
    var URL = req.query.URL;

    ytdl.getInfo(URL, (err, info) => {
        if (err){
            return next(err);
        }
        else {

            /*
            const admin = require('firebase-admin');

            let serviceAccount = require('explore-253519-19fcdc3f6783.json');

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });

            let db      = admin.firestore();
            let docRef  = db.collection('users').doc('alovelace');

            let setAda  = docRef.set({
                first: 'Ada',
                last: 'Lovelace',
                born: 1815
            });

            let aTuringRef = db.collection('users').doc('aturing');

            let setAlan = aTuringRef.set({
                'first': 'Alan',
                'middle': 'Mathison',
                'last': 'Turing',
                'born': 1912
            });

             */

            let format = ytdl.chooseFormat(info.formats, {quality: 'highestaudio'});

            if (format) {
                res.header('Content-Disposition', 'attachment; filename="' + info.title + '.mp4"');
                console.log('Format found!');
                ytdl(URL,
                    {
                        format  : 'mp4',
                        quality : 'highestaudio',
                        filter  : (format) => format.container === 'mp4'
                    }).pipe(res);
            }

            return format;
        }
    });
});

module.exports = router;
