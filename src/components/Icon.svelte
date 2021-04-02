<script>
  export let size = '30',
    color = 'black',
    opacity = false,
    icon;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon"
  class:icon--opacity={opacity}
  width={size}
  height={size}
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke={color}
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  {#if icon === 'lock'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
  {:else if icon === 'unlock'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="3" y1="3" x2="21" y2="21" />
    <path
      d="M19 19a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h4m4 0h2a2 2 0 0 1 2 2v2"
    />
    <circle cx="12" cy="16" r="1" />
    <path
      d="M8 11v-3m.712 -3.278a4 4 0 0 1 7.288 2.278v4"
    />
  {:else if icon === 'trashcan'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
    <path
      d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
    />
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  {:else if icon === 'grid-add'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <rect x="4" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="4" width="6" height="6" rx="1" />
    <rect x="4" y="14" width="6" height="6" rx="1" />
    <path d="M14 17h6m-3 -3v6" />
  {:else if icon === 'chevrons-left'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="11 7 6 12 11 17" />
    <polyline points="17 7 12 12 17 17" />
  {:else if icon === 'dots-vertical'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
    <circle cx="12" cy="5" r="1" />
  {:else if icon === 'pencil'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"
    />
    <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
  {:else if icon === 'plus-sign'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  {:else if icon === 'plus-sign-square'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="12" y1="9" x2="12" y2="15" />
  {:else if icon === 'reposition'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10 12h-7l3 -3m0 6l-3 -3" />
    <path d="M14 12h7l-3 -3m0 6l3 -3" />
    <path d="M3 6v-3h18v3" />
    <path d="M3 18v3h18v-3" />
  {:else if icon === 'open-eye'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="2" />
    <path
      d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"
    />
  {:else if icon === 'closed-eye'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="3" y1="3" x2="21" y2="21" />
    <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
    <path
      d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341"
    />
  {:else if icon === 'check'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l5 5l10 -10" />
  {:else if icon === 'chevron-down'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="6 9 12 15 18 9" />
  {:else if icon === 'rename'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"
    />
    <path
      d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"
    />
    <line x1="16" y1="5" x2="19" y2="8" />
  {:else if icon === 'startpaper'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="10" y1="14" x2="21" y2="3" />
    <path
      d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"
    />
  {:else if icon === 'map-pin'}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="11" r="3" />
    <path
      d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"
    />
  {:else}
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path
      d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
    />
    <line x1="12" y1="17" x2="12.01" y2="17" />
    <line x1="12" y1="11" x2="12" y2="14" />
  {/if}
</svg>

<style>
  .icon--opacity {
    opacity: 0.2;
  }
  .icon--opacity:hover {
    opacity: 1;
  }
</style>
