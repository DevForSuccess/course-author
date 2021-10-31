echo %time%
cbimport csv -c couchbase://127.0.0.1:8091 -u Administrator -p student -b authors -g #UUID# -d file://./database/data/authorData.csv
echo %time%