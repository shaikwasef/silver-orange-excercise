import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React from 'react';

interface PropsInterface {
  languages: string[];
  handleClick: (value: string) => void;
}

export default function LanguageButtonsGroup(props: PropsInterface) {
  const { languages, handleClick } = props;
  return languages.length > 1 ? (
    <FormControl>
      <FormLabel>Language</FormLabel>
      <RadioGroup
        row={true}
        defaultValue="All"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          const el = event.target as HTMLInputElement;
          handleClick(el.getAttribute('value') as string);
        }}
      >
        {languages.map((language, index) => (
          <FormControlLabel
            key={index}
            value={language}
            control={<Radio />}
            label={language}
          />
        ))}
      </RadioGroup>
    </FormControl>
  ) : (
    <div />
  );
}
