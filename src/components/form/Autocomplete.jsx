import Autosuggest from 'react-autosuggest';
import React, { Component } from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import {
  MenuItem,
  Paper,
  withStyles,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
    width: '100%',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
});

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
};

class Autocomplete extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: null,
      suggestions: [],
    };
  }

  onChange = (event, { newValue }) => {
    const { onChange } = this.props;
    onChange(newValue);
    this.setState({
      value: newValue,
    });
  };

  onSelect = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    const { onSelect } = this.props;
    onSelect(suggestion)
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const { items } = this.props;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : items.filter(suggestion =>
      suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  render() {
    const { value, suggestions } = this.state;
    const { classes, placeholder, initialValue } = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder,
      className: 'fakeInput',
      value: value || initialValue,
      onChange: this.onChange,
      style:{ width: '100%' },
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSelect}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    );
  }
}

export default withStyles(styles)(
  Autocomplete,
);
