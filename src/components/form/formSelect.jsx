import { createEffect, createSignal } from "solid-js";
import "./formSelect.css";

const FormSelect = ({ multiple, options, defaultValues, ...restProps }) => {
  let inputRef;
  let dropdownRef;
  const [selected, setSelected] = createSignal(defaultValues ? defaultValues.split(',') : []);
  const [expanded, setExpanded] = createSignal(false);

  createEffect(() => {
    inputRef.value = selected();
  })

  const outsideListener = (event) => {
    if (!dropdownRef.contains(event.target) && expanded()) {
      setExpanded(false);
    }
  }

  createEffect(() => {
    document.addEventListener('click', event => outsideListener(event))
    return document.removeEventListener('click', event => outsideListener(event))
  })
  
  function dropdownToggle() {
    setExpanded(!expanded());
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
    <div ref={dropdownRef} class="multiselect">
      <div class="selectBox" onclick={dropdownToggle}>
        <select>
          <option>Select an option</option>
        </select>
        <div class="overSelect"></div>
        <input ref={inputRef} name={restProps.name} style={{display: 'none'}}/>
      </div>
      <div class="checkboxes" style={{display: expanded() ? 'block' : 'none'}}>
        <label for="select-all" onClick={handleSelectAll}>
          <input
            type="checkbox"
            value={""}
            checked={selected().length === options.length}
            indeterminate={selected().length !== 0 && selected().length !== options.length}
          />
          {selected().length ? `Selected ${selected().length} in ${options.length}` : 'Select all'}
        </label>
        {options.map((e, i) => (
          <label for={e.value} onClick={handleChange}>
            <input
              id={`${restProps.name}.${e.value}`}
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
