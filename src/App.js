import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/** Simple custom form hook */
const useForm = initialValues => {
  const [values, setValues] = React.useState(initialValues);

  const updateValue = event => {
    const { value, name } = event.currentTarget;
    setValues({ ...values, [name]: value });
  };

  return [values, updateValue];
};

/** Select component */
const SelectComponent = ({ name, value, onChange, options }) => {
  return (
    <Form.Control as="select" name={name} onChange={onChange} value={value}>
      {options &&
        options.map(opt => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
    </Form.Control>
  );
};

/** Default app */
export default function App() {
  const initialValues = {
    name: "",
    lastName: "",
    role: "",
    office: ""
  };

  const [values, updateValue] = useForm(initialValues);

  const handleSubmit = event => {
    event.preventDefault();
    alert(JSON.stringify(values));
  };

  const selectOptions = {
    role: () => ["", "Backend", "Frontend", "Fullstack"],
    office: () => {
      const all = ["", "Dusseldorf", "Warsaw", "Brussels"];
      const [empty, duss, war, brus] = all;
      return {
        Frontend: all,
        Backend: [empty, duss],
        Fullstack: [empty, war, brus]
      };
    }
  };

  const fieldTypes = props => {
    return {
      name: <Form.Control {...props} />,
      lastName: <Form.Control {...props} />,
      role: <SelectComponent {...props} options={selectOptions.role()} />,
      office: (
        <SelectComponent
          {...props}
          options={selectOptions.office()[values.role]}
        />
      )
    };
  };

  return (
    <div className="App">
      <Container>
        <Form id="dynamic-selects" onSubmit={handleSubmit}>
          {Object.entries(values).map(([key, value]) => {
            const childProps = {
              name: key,
              value,
              onChange: updateValue
            };
            return (
              <Form.Row key={key}>
                <Form.Group>
                  <Form.Label>{key}</Form.Label>
                  {fieldTypes(childProps)[key]}
                </Form.Group>
              </Form.Row>
            );
          })}
          <Form.Row>
            <Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
        <pre>{JSON.stringify(values, "", "\t")}</pre>
      </Container>
    </div>
  );
}
