function shuffleUsers(users) {
  let html = "<ul>";

  users.sort((a, b) => Math.random() - 0.5); // 50% de chance nombre au dessus ou en dessou de 0

  for (const user of users) {
    html = +`<li>${user}</li>`;
  }

  html += "</ul>";

  return html;
}

module.exports = shuffleUsers;
