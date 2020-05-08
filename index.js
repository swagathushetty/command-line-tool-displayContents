#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk=require('chalk')
const path=require('path')


// Method #3
const { lstat } = fs.promises;
// console.log(process.argv)

const targetDir=process.argv[2] || process.cwd()

fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        console.log(err);
    }

    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir,filename));
    });

    // console.log(statPromises)

    const allStats = await Promise.all(statPromises);

    // console.log(allStats)

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);
        // console.log(stats,index)

        if(stats.isFile()){
            console.log(filenames[index])
        }else {
            console.log(chalk.bold(filenames[index]))
        }

    }
});

