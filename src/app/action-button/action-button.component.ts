import { Component } from '@angular/core';

@Component({
  selector: 'app-action-button',
  template: `<div class=center> <div class="button-container">
  <a href="https://docs.google.com/document/d/e/2PACX-1vR5YKP8CZMf1L1NDOvgV11xxFE-87CQ0SqDnO_t7zgcMG1bC6neo8VdNYGdNIMJ8cGKmL7Ty9cV_UbU/pub" class="circle-button" target="_blank">📄</a>
  <a href="https://ibm.enterprise.slack.com/user/@U022X990PRA" class="rounded-button" target="_blank"><p>💬 Message On <b>Slack</b> </p></a>
</div> </div>
`,
  styleUrls: ['./action-button.component.css'],
})
export class ActionButtonComponent {}
