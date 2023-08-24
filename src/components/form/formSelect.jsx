import { createEffect, createSignal } from "solid-js";
import "./formSelect.css";

const FormSelect = ({ multiple, options, defaultValues, ...restProps }) => {
  const [selected, setSelected] = createSignal(defaultValues ? defaultValues.split(',') : []);

  createEffect(() => {
    let selectValues = document.getElementById("_selectValues");
    selectValues.value = selected();
  })

  var expanded = false;

  function showCheckboxes() {
    let checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
  }

  const handleChange = (event) => {
    const target = event.target;
    if (target.checked) {
      setSelected([...selected(), target.value]);
    } else {
      setSelected(selected()?.filter((e) => e !== target.value));
    }
  };

  const handleSelectAll = (event) => {
    const target = event.target;
    if (target.checked) {
      setSelected(options.map((e) => e.value.toString()));
    } else {
      setSelected([]);
    }
  };

  return multiple ? (
    <div class="multiselect">
      <div class="selectBox" onclick={showCheckboxes}>
        <select>
          <option>Select an option</option>
        </select>
        <div class="overSelect"></div>
        <input id={'_selectValues'} name={restProps.name} />
      </div>
      <div id="checkboxes">
        <label for="select-all" onClick={handleSelectAll}>
          <input
            type="checkbox"
            id={"select-all"}
            value={""}
            checked={selected().length === options.length}
            indeterminate={selected().length !== 0 && selected().length !== options.length}
          />
          {selected().length ? `Selected ${selected().length} in ${options.length}` : 'Select all'}
        </label>
        {options.map((e, i) => (
          <label for={e.value} onClick={handleChange}>
            <input
              id={e.value}
              type="checkbox"
              value={e.value}
              checked={selected().includes(e.value.toString())}
            />
            {e.label}
          </label>
        ))}
      </div>
    </div>
  ) : (
    <select name={restProps.name}>
      {options.map((e) => (
        <option value={e.value}>{e.label}</option>
      ))}
    </select>
  );
};

export default FormSelect;
