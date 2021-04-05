<script>
  import GridLogic from './GridLogic.svelte';
  import Menubar from './menubar/Menubar.svelte';
  import Cardbar from './Cardbar.svelte';
  import { layouts } from '../stores/layoutsStore';
  import { userInfo } from '../stores/userInfoStore';

  let editmode = false;
  let addmode = false;

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

  setInterval(() => {
    updateTime();
  }, 1000);
</script>

<Cardbar {addmode} />
<Menubar {editmode} {setEditmode} {addmode} {setAddmode} />
<GridLogic {editmode} />
