import { Button } from "~/components/ui/button";
import { getTodos, getTodosId, get404, get500, get401 } from "~/api/todos";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";

export function meta() {
  return [{ title: 'Call Api' }, { name: 'description', content: 'CallApi' }];
}

export default function CallApi() {
  const { t } = useTranslation();
  const [response, setResponse] = useState<Record<string, React.ReactNode> | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  const handleTodos = async () => {
    setIsLoading(true);
    setResponse(null);
    const todos = await getTodos(t);
    setResponse(todos);
    setIsLoading(false);
  }

  const handleTodosId = async () => {
    setIsLoading(true);
    setResponse(null);
    const todos = await getTodosId(t, 1);
    setResponse(todos);
    setIsLoading(false);
  }

  const handle404 = async () => {
    setIsLoading(true);
    setResponse(null);
    const error = await get404(t);
    setIsLoading(false);
  }

  const handle500 = async () => {
    setIsLoading(true);
    setResponse(null);
    const error = await get500(t);
    setIsLoading(false);
  }

  const handle401 = async () => {
    setIsLoading(true);
    setResponse(null);
    const error = await get401(t);
    setIsLoading(false);
  }

  return (
    <div>
      <div>
        <Button onClick={handleTodos} loading={loading}>Call List</Button>
        <Button onClick={handleTodosId} loading={loading}>Call Id 1</Button>
        <Button onClick={handle404} loading={loading}>Call 404</Button>
        <Button onClick={handle500} loading={loading}>Call 500</Button>
        <Button onClick={handle401} loading={loading}>Call 401</Button>
      </div>

      <div className="mt-4">
        <h2>Response</h2>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  )
}
