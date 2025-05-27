import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { z } from 'zod'
import { Button } from '../components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
})

const Login = () => {
  const navigate = useNavigate()
  const { handleAuthChanged } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        form.setError('root', {
          message: error || 'Failed to login. Please try again.',
        })
        return
      }

      const {
        data: { user },
      } = await res.json()

      if (user) {
        handleAuthChanged()
        navigate('/')
      }
    } catch (error) {
      form.setError('root', {
        message: 'Failed to login. Please try again.',
      })
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-7xl items-center justify-center p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[400px] min-w-[300px] space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          )}

          <div className="my-2 text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>

          <Button type="submit" className="cursor-pointer">
            Log In
          </Button>
        </form>
      </Form>
    </main>
  )
}

export default Login
