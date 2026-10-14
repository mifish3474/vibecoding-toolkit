const promptText = `I am a teacher with no programming experience. I would like your help designing and building a useful tool for my classroom.

YOUR ROLE
Act as my friendly, patient software development partner. Explain things in everyday language, avoid unnecessary technical jargon, and never assume I know how to program.

MY IDEA
The problem I am trying to solve:
[Describe the problem here.]

The tool I envision:
[Describe your idea here. If you're not sure yet, leave this blank and help me brainstorm.]

PRIVACY AND SAFETY
Because this tool will be used in an educational setting, student privacy, FERPA, and responsible data handling are non-negotiable considerations.

Before designing the tool, help me identify privacy and security concerns. Never ask for real student names, education records, or sensitive information during development; use fictional examples. If the tool collects, stores, transmits, or displays student information, explain the risks and safer alternatives. Do not assume local storage or use of an approved AI platform automatically makes a tool FERPA-compliant. Flag when district approval or privacy review may be needed.

TECHNICAL REQUIREMENTS
My goal is to publish a simple tool directly in Google Sites using Full page embed → Embed code, without separate hosting. This is a firm preference, not a request to deploy the tool to GitHub Pages or another hosting service.

Whenever practical, create one self-contained block of HTML, CSS, and JavaScript, using <style> and <script> tags as appropriate. Avoid external libraries, databases, servers, installations, and dependencies. Prefer a tool that runs in a browser and works on both computers and phones. Explain any limitations of Google Sites' embedded environment, including that local browser storage may not reliably persist or sync between devices. If a feature requires external services or cannot work in direct Google Sites embedding, explain the tradeoff before implementing it. Do not recommend external hosting unless a required feature makes it necessary or I ask for it.

INTERVIEW ME BEFORE BUILDING
Do not begin writing code yet. Ask one question at a time and wait for my answer. Start by understanding the problem and privacy implications. Keep your questions easy to understand. After each answer, estimate how many questions remain; revise the estimate as needed. Suggest simpler approaches where appropriate and distinguish must-have features from future improvements.

CONFIRM OUR PLAN
Once you understand the project, summarize in plain English: (1) the problem, (2) what the tool will do, (3) essential first-version features, (4) privacy concerns and safeguards, (5) where information will be stored, and (6) how it can be published directly in Google Sites. Ask whether I approve the plan. Do not code until I explicitly approve.

BUILD, TEST, AND IMPROVE
Once approved, create the simplest functional version first. Explain how to test it. When I request changes, make only necessary changes and preserve working features. Help me troubleshoot in plain language; do not assume a change works until I've tested it.

When ready to publish, provide the complete self-contained code in one copyable block. Explain how to open Google Sites, choose Pages → New page → Full page embed → Embed code (not By URL), paste the code, preview, and publish. Help me test it on a computer and phone. If the current Google Sites interface differs, help me find the equivalent steps.

Remember: I am the teacher and problem-solver. You are my technical partner. Let's build something useful!`;
window.addEventListener('DOMContentLoaded',()=>{const pre=document.getElementById('starter-prompt');if(pre)pre.textContent=promptText;const copy=document.getElementById('copy-prompt');if(copy)copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(promptText);copy.textContent='✓ Copied!';setTimeout(()=>copy.textContent='Copy starter prompt',2200)}catch{const el=document.getElementById('starter-prompt');const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(el);selection.removeAllRanges();selection.addRange(range);copy.textContent='Select text and copy';}})});
/* Accessible click-to-enlarge image viewer: close button, backdrop, Escape. */
window.addEventListener('DOMContentLoaded',()=>{
  const pictures=[...document.querySelectorAll('main img')];
  if(!pictures.length)return;
  const layer=document.createElement('div');layer.className='image-lightbox';layer.hidden=true;layer.setAttribute('role','dialog');layer.setAttribute('aria-modal','true');layer.setAttribute('aria-label','Expanded image');
  const full=document.createElement('img');full.alt='';
  const close=document.createElement('button');close.type='button';close.className='lightbox-close';close.setAttribute('aria-label','Close expanded image');close.textContent='×';
  layer.append(full,close);document.body.append(layer);
  let opener=null;
  function dismiss(){layer.hidden=true;full.removeAttribute('src');document.body.style.overflow='';opener?.focus();}
  for(const pic of pictures){pic.dataset.expandable='true';pic.setAttribute('role','button');pic.tabIndex=0;pic.setAttribute('aria-label',(pic.alt||'Image')+'. Click to enlarge');
    const open=()=>{opener=pic;full.src=pic.dataset.fullSrc||pic.currentSrc||pic.src;full.alt=pic.alt||'Expanded image';layer.hidden=false;document.body.style.overflow='hidden';close.focus();};
    pic.addEventListener('click',open);pic.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
  }
  close.addEventListener('click',dismiss);
  layer.addEventListener('click',e=>{if(e.target===layer)dismiss();});
  document.addEventListener('keydown',e=>{if(!layer.hidden&&e.key==='Escape')dismiss();if(!layer.hidden&&e.key==='Tab'){e.preventDefault();close.focus();}});
});

/* Build / Fix / Extend prompt tabs and copy tools */
const debugTemplate = \`When I tested the [feature], [describe exactly what happened].

This is not the expected behavior.

Please fix [feature] so that [describe what should happen instead].

Make this a targeted edit. Preserve all existing features, functionality, and appearance unless a change is necessary to correct this problem.

Briefly explain what you changed and tell me how to test the fix.

Then provide the complete, updated HTML, CSS, and JavaScript in one self-contained code block that I can copy and paste into my Google Site using Full page embed → Embed code.

Do not provide only the changed portion of the code.\`;

const debugExample = \`When I tested the Reset button, points were added to the score instead of clearing it.

This is not the expected behavior.

Please fix the Reset button so that both teams' scores return to zero when it is pressed.

Make this a targeted edit. Preserve all existing features, functionality, and appearance unless a change is necessary to correct this problem.

Briefly explain what you changed and tell me how to test the fix.

Then provide the complete, updated HTML, CSS, and JavaScript in one self-contained code block that I can copy and paste into my Google Site using Full page embed → Embed code.

Do not provide only the changed portion of the code.\`;

const extendTemplate = \`The current functionality is working great! I would like to add the following additional feature:

[Clearly describe the new feature and how it should work.]

Make this a targeted edit. Preserve all existing features, functionality, and appearance unless a change is necessary to add the requested feature.

Briefly explain what you changed, tell me how to test the new feature, and identify any existing functionality I should retest to make sure nothing was affected.

Then provide the complete, updated HTML, CSS, and JavaScript in one self-contained code block that I can copy and paste into my Google Site using Full page embed → Embed code.

Do not provide only the changed portion of the code.\`;

window.addEventListener('DOMContentLoaded', () => {
  const tabs = [...document.querySelectorAll('.prompt-tabs [role="tab"]')];
  if (!tabs.length) return;
  function activate(tab, focus = false) {
    for (const t of tabs) {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
    }
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (e) => {
      let next;
      if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      else return;
      e.preventDefault();
      activate(tabs[next], true);
    });
  });
  for (const [displayId, copyId, content, label] of [
    ['debug-prompt', 'copy-debug', debugTemplate, 'Copy debugging prompt'],
    ['debug-example', 'copy-debug-example', debugExample, 'Copy example'],
    ['extend-prompt', 'copy-extend', extendTemplate, 'Copy feature extension prompt']
  ]) {
    document.getElementById(displayId).textContent = content;
    const button = document.getElementById(copyId);
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(content);
        button.textContent = '✓ Copied!';
        window.setTimeout(() => { button.textContent = label; }, 2000);
      } catch {
        const area = document.getElementById(displayId);
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(area);
        selection.removeAllRanges();
        selection.addRange(range);
        button.textContent = 'Select text and copy';
      }
    });
  }
});
