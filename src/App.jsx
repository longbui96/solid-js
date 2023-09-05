import logo from './logo.svg';
import styles from './App.module.css';
import Form from './components/form';
import FormSelect from './components/form/formSelect';

function App() {
  const options = [
    {
      value: 1,
      label: 'test1'
    }, {
      value: 2,
      label: 'test2'
    }, {
      value: 3,
      label: 'test3'
    }, {
      value: 4,
      label: 'test4'
    }
  ]

  const defaultValues = Object.fromEntries(new URLSearchParams(location.search));

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Form id="form">
          <FormSelect name={"org"} options={options} multiple={true} defaultValues={defaultValues.org} />
          <button html="submit">
            Submit
          </button>
          <FormSelect name={"org1"} options={options} multiple={true} defaultValues={defaultValues.org} />
        </Form>
      </header>
    </div>
  );
}

export default App;
