<script>
  import Dropdown from "../dropdown/Dropdown.svelte";
  import { getContext, onMount } from "svelte";
  import { userInfo } from "../../stores/userInfoStore";
  import { themeName } from "../../stores/themeNameStore";
  import { columns } from "../../stores/columnsStore";
  import { layouts } from "../../stores/layoutsStore";

  let { toggle, current, theme } = getContext("theme");

  export let showDropdown, setShowDropdown;

  $: themeIcon = "sun";

  $: dropdownOptions = [
    {
      text: "Appearance",
      header: true,
    },
    {
      text: $themeName,
      icon: themeIcon,
      iconColor: "black",
      function: cycleTheme,
    },
    {
      text: "Custom scrollbar",
      toggle: true,
      toggleStatus: $columns.dynamic,
      function: toggleColumns,
    },
    {
      divider: true,
    },
    {
      text: "Layout",
      header: true,
    },
    {
      text: "Dynamic",
      toggle: true,
      toggleStatus: $columns.dynamic,
      function: toggleColumns,
    },
    {
      text: "Columns",
      numberPicker: true,
      hide: $columns.dynamic,
    },
    {
      text: "Import",
      icon: "table-import",
      iconColor: "black",
      function: openFileBrowser,
    },
    {
      text: "Export",
      icon: "file-export",
      iconColor: "black",
      function: exportLayouts,
    },
  ];

  const toggleColumns = () => {
    columns.setDynamic(!$columns.dynamic);
  };

  const setTheme = (newTheme) => {
    if (newTheme === "Light") {
      current.set("Light");
    } else if (newTheme === "Dark") {
      current.set("Dark");
    } else if (newTheme === "Auto") {
      if ($userInfo.time.hours >= 20 || $userInfo.time.hours < 5) {
        current.set("Dark");
      } else {
        current.set("Light");
      }
    }
  };

  $: setTheme($themeName);

  const cycleTheme = () => {
    if ($themeName === "Auto") {
      themeName.set("Light");
      themeIcon = "sun";
    } else if ($themeName === "Light") {
      themeName.set("Dark");
      themeIcon = "moon";
    } else if ($themeName === "Dark") {
      themeName.set("Auto");
      themeIcon = "sun-half";
    }
  };

  const exportLayouts = () => {
    let dataStr = JSON.stringify($layouts);
    let dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    let exportFileDefaultName = "startpaper.json";

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const openFileBrowser = () => {
    document.getElementById("file1").click();
  };

  const handleFileInputChange = () => {
    const selectedFile = document.getElementById("file1").files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      console.log(JSON.parse(e.target.result));
      layouts.set(JSON.parse(e.target.result));
    };
    reader.readAsText(selectedFile);
  };
</script>

<Dropdown
  {showDropdown}
  {setShowDropdown}
  rightside={true}
  {dropdownOptions}
  width={"12rem"}
/>
<input
  type="file"
  id="file1"
  style="display: none;"
  on:change={handleFileInputChange}
/>
