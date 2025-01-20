import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/http/api"
import { LoaderCircle } from "lucide-react"

const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    genre: z.string().min(2, {
        message: 'Genre must be at least 2 characters.',
    }),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters.',
    }),
    coverImage: z.instanceof(FileList).refine((file) => {
        return file.length == 1;
    }, 'Cover Image is required'),
    file: z.instanceof(FileList).refine((file) => {
        return file.length == 1;
    }, 'Note PDF is required'),
});

const CreateNote = () => {

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            genre: '',
            description: '',
        },
    });

    const coverImageRef = form.register('coverImage');
    const fileRef = form.register('file');

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            console.log('Note created successfully');
            navigate('/dashboard/notes');
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formdata = new FormData();
        formdata.append('title', values.title);
        formdata.append('genre', values.genre);
        formdata.append('description', values.description);
        formdata.append('coverImage', values.coverImage[0]);
        formdata.append('file', values.file[0]);
        mutation.mutate(formdata);
    }

    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-between">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink>Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink>
                                        <Link to="/dashboard/notes">Note</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Create</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard/notes">
                                <Button variant={'outline'}>
                                    <span className="ml-2">Cancel</span>
                                </Button>
                            </Link>
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending && <LoaderCircle className="animate-spin" />}
                                <span className="ml-2">Submit</span>
                            </Button>
                        </div>
                    </div>
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Create a new note</CardTitle>
                            <CardDescription>
                                Fill out the form below to create a new note.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input type="text" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="genre"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Genre</FormLabel>
                                            <FormControl>
                                                <Input type="text" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea className="min-h-32" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="coverImage"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Cover Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    className="w-full"
                                                    {...coverImageRef}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Note File</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    className="w-full"
                                                    {...fileRef}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </section>
    )
}

export default CreateNote