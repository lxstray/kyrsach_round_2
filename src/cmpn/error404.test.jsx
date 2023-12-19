import React from 'react';
import { render, screen } from '@testing-library/react';
import Error404 from './error404';  // Путь к вашему компоненту

test('renders Error404 component correctly', () => {
  render(<Error404 />);

  // Проверяем, что компонент рендерится корректно
  const errorContent = screen.getByTestId('error-content');
  expect(errorContent).toBeInTheDocument();

  // Проверяем, что заголовок рендерится корректно
  const heading = screen.getByText('404');
  expect(heading).toBeInTheDocument();

  // Проверяем, что текст ошибки рендерится корректно
  const errorText = screen.getByText('page not found');
  expect(errorText).toBeInTheDocument();

  // Проверяем, что кнопка рендерится корректно
  const btnPrimary = screen.getByRole('link', { name: 'go home' });
  expect(btnPrimary).toBeInTheDocument();
});
