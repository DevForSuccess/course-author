const generateAuthor = () => {
    let first_name, middle_name, last_name, job, employer, rating, reviews, students, courses, thumbnail, bio, created_at, updated_at;

    first_name = 'John';
    middle_name = 'D';
    last_name = Math.floor(Math.random() * 100000);
    rating = (Number.parseFloat((Math.random() * 2) + 3).toFixed(1));
    reviews = Math.floor(Math.random() * 100000);
    students = Math.floor(Math.random() * 1000000);
    courses = Math.floor(Math.random() * 90) + 10;
    thumbnail = `https://authors-avatar.s3.amazonaws.com/${reviews}.jpg`;

    let authorObj = {
        first_name, middle_name, last_name, job, employer, rating, reviews, students, courses, thumbnail, bio, created_at, updated_at
    };
    return authorObj;
}
// generateAuthor();

module.exports = {
    generateAuthor
}