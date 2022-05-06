import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  LegacyRef,
  RefCallback,
  MutableRefObject,
  RefObject,
  InputHTMLAttributes,
} from 'react';

import { useField, UnformField } from '@unform/core';

import { Container } from './styles';
import { IconBase } from 'react-icons';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  ref?: RefObject<HTMLInputElement>
  current?: {
    value: null;
  }
}

export const Input = ({ name, ...rest }: InputProps) => {
  const inputRef: InputProps["ref"] = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {IconBase && <IconBase size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        {...rest}
        ref={inputRef}
      />
    </Container>
  );
};
