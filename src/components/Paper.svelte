<script>
  import GridLogic from "./GridLogic.svelte";
  import Menubar from "./menubar/Menubar.svelte";
  import Cardbar from "./Cardbar.svelte";
  import { layouts } from "../stores/layoutsStore";
  import { userInfo } from "../stores/userInfoStore";
  import { onMount } from "svelte";
  import { pages } from "../stores/pagesStore";
  import { activePage } from "../stores/activePageStore";

  let editmode = false;
  let addmode = false;

  $: if (!editmode) {
    addmode = false;
  }

  const setEditmode = (bool) => {
    editmode = bool;
    layouts.toggleEditmode(editmode);
  };

  const setAddmode = (bool) => {
    addmode = bool;
  };

  const updateTime = () => {
    let d = new Date();
    userInfo.setTime({
      hours: d.getHours(),
      minutes: d.getMinutes(),
      seconds: d.getSeconds(),
    });
  };

  onMount(() => {
    layouts.toggleEditmode(editmode);
  });

  setInterval(() => {
    updateTime();
  }, 1000);

  // const checkForShortcut = (e) => {
  //   if (e.target.nodeName === "INPUT" || e.target.nodeName === "TEXTAREA")
  //     return;

  //   activePage.setActivePage()
  // };
</script>

<!-- <svelte:window on:keydown={checkForShortcut} /> -->

<Cardbar {addmode} />
<Menubar {editmode} {setEditmode} {addmode} {setAddmode} />
<GridLogic {editmode} />
