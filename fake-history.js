const simpleGit = require('simple-git');
const { execSync } = require('child_process');
const path = require('path');

// Configuration
const userName = 'jaynilson';
const userEmail = 'jaynilson@email.com';
const startYear = 2017;
const endYear = 2019;
const minDays = 2;
const maxDays = 120;
const commitCount = 100; // Number of commits to generate

// Initialize simple-git
const git = simpleGit();

// Function to get a random date between the given range
function getRandomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date;
}

// Function to format date as required for git commits
function formatDate(date) {
    return date.toISOString().split('.')[0] + 'Z';
}

// Function to generate commits
async function generateCommits() {
    // Initialize a new git repository
    await git.init();
    await git.addConfig('user.name', userName);
    await git.addConfig('user.email', userEmail);

    // Loop to create commits
    for (let i = 0; i < commitCount; i++) {
        const startDate = new Date(startYear, 0, 1);
        const endDate = new Date(endYear, 11, 31);
        const date = getRandomDate(startDate, endDate);

        // Create a random file
        const fileName = `file_${i}.txt`;
        execSync(`echo "Commit ${i}" > ${fileName}`);

        // Add and commit the file
        await git.add(fileName);
        await git.commit(`Commit ${i}`, { '--date': formatDate(date) });

        // Log the commit
        console.log(`Created commit ${i} on ${date}`);
    }

    console.log('Fake commit history created successfully!');
}

// Run the function to generate commits
generateCommits().catch(err => console.error('Error creating fake commits:', err));
