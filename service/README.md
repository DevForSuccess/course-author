# Yosep Tjahja (SDC Project)

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Dependencies](#dependencies)
4. [API](#api)
5. [Journal](#journal)
6. [Documentation](#documentation)

## Usage

To seed database:

```sh
npm run seed
```

To create bundle:

```sh
npm run build
```

To start server:

```sh
npm run start
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

### Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

#### API

Get: http://localhost:4095/author?authorId=:authorId<br/>
Post: http://localhost:4095/author<br/>
Put: http://localhost:4095/author?authorId=:authorId<br/>
Delete: http://localhost:4095/author?authorId=:authorId<br/>

#### Journal



<ins>06/24/2021</ins>: Review<br/>
This project is the continuation of Front End Capstone project that was started by the other team (the team that started this project). The focus of this project is the scalability and performance benchmark. The application is going to be measured against a high traffic request (minimum of 100 requests per second) with a minimum 10 millions database recaords.
I have been assigned to work on this Author portion of the project, we are a team of four.

<ins>06/25/2021</ins>: Started working<br/>
I had been busy reviewing the legacy code. There were interesting front end codes that I wanted to get more intimated with but given the scope of this project, I tried to refrain myself from going deep dive on those codes, next time when I have a chance perhaps.

<ins>06/26/2021</ins>: API CRUD methods<br/>
Started working on developing the CRUD methods of the server API. The legacy code only has the read/GET path so I refactored a bit on the read before moving on to the POST, PATCH, and DELETE routes. 

<ins>06/28/2021</ins>: API CRUD test<br/>
Jest time! Not really my fav part in the development world but it's pretty much the requirement. Used 'supertest' to test all four CRUD paths. Finally got it done.

<ins>06/29/2021</ins>: Database research<br/>
We want to try different databases for this SDC project. It uses MongoDB for the previous phase (FDC) so eventhough it is one of my favorite Db, I need to look around and compare at least one SQL and one NOSQL database.
List of SQL candidates to research on: MySql, Postgres, MariaDB.
NOSQL: Cassandra, Riak, Couchbase, CouchDB

Project intro
DB research
Data generation scripts
Queries performance benchmarks

<ins>06/30/2021</ins>: Database generation scripts<br/>
Working on developing data seeding scripts to generate 10 millions records of data. I used Postgres for this task and managed to generate up to 5 millions records before getting time out error. Splitting it is, 2 processes of 5 millions records each.

<ins>07/01/2021</ins>: CRUD test review, fake image script<br/>
Got feedback from one of team member on the CRUD test code, added additional test to make sure that retrieving the deleted record will get an empty result.
Working on creating fake images code, use Fetch API request method to dynamically revisit the faker image website (thispersondoesnotexist.com) and downloaded the image.

<ins>07/03/2021</ins>: Here we go, the two DBs to benchmark<br/>
SQL: Postgres<br/>
NOSQL: Couchbase<br/>
<br/>
I did not really measure and compare every single potential DB because it always comes down to advantages and disadvantages, no DB is 'de-facto' the best database. I used the criterias below:<br/>
- installation simplicity<br/>
- documentation<br/>
- popularity -> always helpful to be in the main stream: longevity and abundance of available helps/QAs<br/>
<br/>
I actually wanted to go with MySQL for the SQL database but figured to try other SQL db, I think Postgres goes toe-to-toe with Mysql.<br/>
From the NOSQL camp, I played a little bit with Cassandra, not really content with the installation steps as a lot of compatibility issue with the Java runtime version. Also, it takes more computing power and requires a larger EC2 instance and it's not going to work on the free tier instance.<br/>
<br/>
<ins>07/06/2021</ins>: Created data generation scripts for both chosen DBs<br/>
Okay, so I wanted to try different ways to improve the data generation script. I tried extending Node js default memory allocation by using the --max-old-space-size option and run the Postgres seeding script again. This time, it did not time out after generating 5 millions records but here is the interesting part, the process was slower, much slower.<br/>
It took approximately 10 minutes to generate 5 millions records but putting it altogether and make it 10 millions by extending the memory allocation took about 5 hours to generate less than 1 million records. I just stopped it at that point, I think it's not really feasible.<br/>
<br/>
<ins>07/07/2021</ins>: Alternative better solution<br/>
Use the copy statement from postgres. <br/>
Basically it requires two steps, first is to generate the data as csv file and then import/copy that file into Postgres. The two steps took less than a minute<br/>
<br/>
Here is the stats:<br/>
Processing 10 millions records into csv file. It took about 17 seconds to complete the process.<br/>
Copying 10 millions records from csv file into Postgres database. The process consumed 17-20% CPU processing power. The process took about 2.5 seconds.<br/>
<br/>
<ins>07/08/2021</ins>: Getting familiar with Couchbase<br/>
Okay, so MongoDB was the only NOSQL database that I have been exposed to, so I kind need to get more info on Couchbase. There is obviously less conversation compared to MongoDb but it has quite an extensive documentation so I did not really go down the rabbit hole per se, just needed time to get to know its quirks.<br/>
<br/>
<ins>07/09/2021</ins>: Propagating data generation script for Couchbase<br/>
I used the cbimport statement from Couchbase to import the same csv file that I used for Postgres. Using the Node Js spawn shell command child process, I was copying 10 millions records from csv file into Couchbase database. The process consumed 8-12% CPU processing power but utilized an additional 40-50% CPU processing power for Memcached. The process took about 20 minutes.<br/>
Next is to perform SQL query execution benchmarks.<br/>
It took Postgres about 1ms for both select and update statement and it took Couchbase 3ms and 66ms respectively for the same statements.<br/><br/>

<ins>07/10/2021</ins>: Database to work with<br/>
It's understandably justified that Postgres performed better for this type of database operation due to the nature of SQL database which is more suitable for transactional database operations. My database is not that complex (i.e. does not have hierarchical structure nor require unstructured data storage) Also, since I do not have complex database, I will not have the advantage of not having to spend time to prepare my database relations.
<br/>

<ins>07/13/2021</ins>: Discussion<br/>
Had a rather lengthy conversation with the other team members, just shared all the findings that we had, some challenges and roadblocks that one of the team member had because she had a rather complex database structure. She had a hierarchical structure on one collection which has a join relationship to another collection and the combination of those multiple joins of 10 millions records produced an insanely large amount of billion of records.<br/>
<br/>

<ins>07/27/2021</ins>: Back to SDC after Mini Apps weeklong break<br/>
Found new material in Learn dashboard to read & watch. Created account at New Relic and tried to get familiar with its interface.<br/>
<br/>

<ins>07/28/2021</ins>: Rework server/database code<br/>
The legacy code uses MongoDB and I need to update the code to use the new database (Postgres)<br/>
<br/>

<ins>08/06/2021</ins>: Stress Test<br/>
K6
<br/>

<ins>08/09/2021</ins>: AWS deployment<br/>
<br/>

<ins>08/10/2021</ins>: Stress Test<br/>
Loader.IO: 10,000 RPS
<br/>

<ins>08/11/2021</ins>: Node Cluster Module<br/>
<br/>

<ins>08/18/2021</ins>: Reverse Proxy & Load Balancer<br/>
Created NodeJS based load balancer
<br/>

#### Documentation
Couchbase CLI: https://docs.couchbase.com/server/current/tools/cbq-shell.html
