<script>
  import Dropdown from "../dropdown/Dropdown.svelte";
  import { getContext, onMount } from "svelte";
  import { userInfo } from "../../stores/userInfoStore";
  import { themeName } from "../../stores/themeNameStore";
  import { columns } from "../../stores/columnsStore";

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
      divider: true,
    },
    {
      text: "Columns",
      header: true,
    },
    {
      text: "Dynamic",
      toggle: true,
      toggleStatus: $columns.dynamic,
      function: toggleColumns,
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
</script>

<Dropdown {showDropdown} {setShowDropdown} rightside={true} {dropdownOptions} />
