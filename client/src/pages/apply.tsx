import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
  coverLetter: z.string().optional(),
  resume: z.union([
    z
      .instanceof(File)
      .refine(
        (file) => file?.type === 'application/pdf',
        'Only PDF files are allowed'
      ),
    z.null(),
  ]),
})

const Apply = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverLetter: '',
      resume: null,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('job', jobId || '')
    formData.append('status', 'applied')
    formData.append('coverLetter', values.coverLetter || '')
    if (values.resume) formData.append('resume', values.resume)

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (!res.ok) {
        const { error } = await res.json()
        form.setError('root', {
          message: error || 'Failed to apply for the job. Please try again.',
        })
        return
      }

      const {
        data: { application },
      } = await res.json()

      if (application) {
        navigate('/')
      }
    } catch (error) {
      console.error('Error creating user:', error)
      form.setError('root', {
        message: 'Failed to create account. Please try again.',
      })
    }
  }

  return (
    <main className="mx-auto my-6 max-w-7xl p-6">
      <h1 className="mb-4 text-center text-2xl font-bold">Application Form</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-[400px] min-w-[300px] space-y-6"
        >
          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your cover letter here."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Your Resume</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Upload you resume"
                    className="cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      field.onChange(file)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          )}

          <Button type="submit" className="cursor-pointer">
            Apply
          </Button>
        </form>
      </Form>
    </main>
  )
}

export default Apply
