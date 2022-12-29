#!/usr/bin/env node

"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const request = require("request");
const path = require("path");
const ora = require("ora");
const cliSpinners = require("cli-spinners");

clear();

//! importing User Data from data.json
const res = fs.readFileSync(path.resolve(__dirname, "data.json"));
const user_data = JSON.parse(res);
const {
  user_name,
  user_email,
  linkedin_username,
  github_username,
  npx_card_handle,
  job_title,
} = user_data;

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: "list",
    name: "action",
    message: "What you want to do?",
    choices: [
      //// Send an email
      {
        name: `Send me an ${chalk.green.bold("email")}?`,
        value: () => {
          open(`mailto:${user_email}`);
          console.log("\nDone, see you soon at inbox.\n");
        },
      },
      //// Open LinkedIn
      {
        name: `Open my ${chalk.blue.bold("linkedin")}?`,
        value: () => {
          open(`https://www.linkedin.com/in/${linkedin_username}`);
          console.log("\nDone, wait for your message.\n");
        },
      },
      //// Open GitHub
      {
        name: `Open my ${chalk.white.bold("GitHub")}?`,
        value: () => {
          open(`https://github.com/${github_username}`);
          console.log("\nDone, wait for your message.\n");
        },
      },
      //// Quit
      {
        name: "Just quit.",
        value: () => {
          console.log("Hasta la vista.\n");
        },
      },
    ],
  },
];

const data = {
  name: chalk.bold.green(`${user_name}`),
  // work: `${chalk.white("Software Engineer at")} ${chalk.hex("#2b82b2").bold("ClearTax")}`,
  work: `${chalk.white(`${job_title}`)}`,
  github: chalk.gray("https://github.com/") + chalk.green(`${github_username}`),
  linkedin:
    chalk.gray("https://linkedin.com/in/") + chalk.blue(`${linkedin_username}`),
  npx: chalk.red("npx") + " " + chalk.white(`${npx_card_handle}`),

  labelWork: chalk.white.bold("       Work:"),
  labelGitHub: chalk.white.bold("     GitHub:"),
  labelLinkedIn: chalk.white.bold("   LinkedIn:"),
  labelCard: chalk.white.bold("       Card:"),
};

const me = boxen(
  [
    `${data.name}`,
    `${data.labelWork}  ${data.work}`,
    ``,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelLinkedIn}  ${data.linkedin}`,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${chalk.italic("I am currently looking for new opportunities,")}`,
    `${chalk.italic("my inbox is always open. Whether you have a")}`,
    `${chalk.italic("question or just want to say hi, I will try ")}`,
    `${chalk.italic("my best to get back to you!")}`,
  ].join("\n"),
  {
    margin: 1,
    float: "center",
    padding: 1,
    borderStyle: "single",
    borderColor: "green",
  }
);

console.log(me);

prompt(questions).then((answer) => answer.action());
