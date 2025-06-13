import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { PasswordInput } from '~/components/common/PasswordInput';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const formSchema = (
  tValidate: (key: string, value?: Record<string, React.ReactNode>) => string
) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: tValidate('required', { ns: 'validate' }) })
      .max(255, { message: tValidate('max', { max: 255, ns: 'validate' }) })
      .email({ message: tValidate('email', { ns: 'validate' }) }),
    password: z
      .string()
      .min(6, {
        message: tValidate('min', { min: 6, ns: 'validate' }),
      })
      .max(50, {
        message: tValidate('max', { max: 50, ns: 'validate' }),
      }),
  });
};

type LoginSchema = z.infer<ReturnType<typeof formSchema>>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(['auth', 'validate']);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginSchema) {
    try {
      setIsLoading(true);
      console.log(data);

      await new Promise(resolve => setTimeout(resolve, 3000));
      if (data.email === "admin@gmail.com") {
        toast.success(t('login.success', {ns: 'auth'}));
      } else {
        throw new Error(t('login.error', {ns: 'auth'}));
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(t('login.error', {ns: 'auth'}));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={e => {
          e.preventDefault();
          void form.handleSubmit(onSubmit)(e);
        }}
        className="grid gap-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('login.email')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="admin@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>{t('login.password')}</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to="/forgot-password"
                className="text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75"
              >
                {t('login.forgotPassword')}
              </Link>
            </FormItem>
          )}
        />
        <Button className="mt-2" loading={isLoading}>
          {t('login.button')}
        </Button>
      </form>
    </Form>
  );
}
