const admin = require('firebase-admin');
const functions = require('firebase-functions');

const express = require('express');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const Twig = require('twig');
const path = require('path');
const os = require('os');
const fs = require('fs');

const app = express();


admin.initializeApp(functions.config().firebase);
const bucket = admin.storage().bucket();

// Handler to take screenshots of a URL.
app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send(
      'Please provide a URL. Example: ?url=https://example.com');
  }
  const browser = res.locals.browser;
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const buffer = await page.screenshot({ fullPage: true });
    res.type('image/png').send(buffer);
  } catch (e) {
    res.status(500).send(e.toString());
  }
  await browser.close();
});

// Handler that prints the version of headless Chrome being used.
app.get('/version', async (req, res) => {
  const browser = res.locals.browser;
  res.status(200).send(await browser.version());
  await browser.close();
});

/**
 *
 * @param {*} req
 * @param {*} res
 */
const activityPdf = async (req, res) => {

  try {
    const data = {
      "date": "2019-09-27",
      "displayName": "< Display Name >",
      "clientName": "< Client >",
      "projectName": "< Project >",
      "month": "MM",
      "year": "YY",
      "days": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      "activity": {
        "1": 1,
        "2": 1,
        "5": 1,
        "6": 1,
        "8": 1,
        "9": 1,
        "12": 1,
        "13": 1,
        "14": 1,
        "15": 1,
        "16": 1,
        "19": 1,
        "20": 1,
        "21": 1,
        "22": 1,
        "23": 1,
        "26": 1,
        "27": 1,
        "28": 1,
        "30": 1
      }
    };

    const localTemplate = path.join(os.tmpdir(), 'localTemplate.html');
    const localPDFFile = path.join(os.tmpdir(), 'localPDFFile.pdf');

    await bucket.file('/pdf/templates/activity.twig').download({ destination: localTemplate });

    console.log("template downloaded locally");

    const source = fs.readFileSync(localTemplate, 'utf8');

    Twig.renderFile(localTemplate, data, async (err, html) => {
      if (err) {
        console.log('Error compiling tempalte', err);
      }

      // const template = handlebars.compile(source);

      // console.log("template compiled with user data");

      // const html = template(data);

      console.log("Got HTML");

      const browser = await puppeteer.launch({
        args: ['--no-sandbox']
      });

      console.log("Browser Created");

      const page = await browser.newPage();

      console.log("Opened new page");

      // await page.setViewport({ width: 1122, height: 794, deviceScaleFactor: 1 });
      await page.setContent(html, { waitUntil: 'networkidle2' });

      console.log("Content set to page");

      const buffer = await page.pdf({
        path: localPDFFile,
        format: 'A4',
        landscape: true,
        printBackground: true,
      });

      console.log("pdf created locally");

      await browser.close();

      // const userId = firebase.auth().currentUser.getIdToken(true);

      return bucket.upload(localPDFFile, { destination: `/users/activity.pdf`, metadata: { contentType: 'application/pdf' } })
        .then(() => {
          res.type('application/pdf');
          return res.send(buffer);
        }).catch(error => {
          console.error(error);
          res.send("PDF created and uploaded!");
        });
    });



  } catch (e) {
    throw new Error('Cannot create invoice HTML template.');
  }
};

const opts = { memory: '2GB', timeoutSeconds: 60 };
exports.screenshot = functions.runWith(opts).https.onRequest(app);
exports.version = functions.runWith(opts).https.onRequest(app);
exports.pdfActivity = functions.runWith(opts).https.onRequest(activityPdf);
