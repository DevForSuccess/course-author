const mongoose = require('mongoose').set('debug', true);
mongoose.connect('mongodb://localhost/overview', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

let overviewSchema = new mongoose.Schema({
  "courseId": Number,
  "title": String, // this may actually be fetched from course content API instead -- TBD
  "tagline": String,
  "students": Number,
  "subjects": [String],
  "author": Number, // external ID
  "thumbnail": String,
  "language": String,
  "captions": [String]
});

let Overview = mongoose.model('Overview', overviewSchema);

let save = (records) => {
  records.forEach(record => {
    let entry = new Overview({
      courseId: record.courseId,
      title: record.title,
      tagline: record.tagline,
      students: record.students,
      subjects: record.subjects,
      author: record.author,
      thumbnail: record.thumbnail,
      language: record.language,
      captions: record.captions
    });
    Promise.resolve(entry.save())
    .then(doc => console.log('Saved', doc._doc.title))
    .catch(err => console.log(err))
  })
};

let get = (courseId, callback) => {
  Overview.find({courseId: courseId})
  .then(doc => callback(doc))
  .catch(err => console.log(err));
}



module.exports.save = save;
module.exports.get = get;