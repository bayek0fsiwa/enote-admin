import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-dropdown-menu"
import { CircleX, FilePlus } from "lucide-react"
import { Link } from "react-router-dom"

const CreateNote = () => {
    return (
        <section>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link to={"/dashboard/home"}>Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Notes</BreadcrumbPage>
                        </BreadcrumbItem><BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Create</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-4">
                    <Button variant={"destructive"}>
                        <CircleX size={20} />
                        <span className="ml-2">Cancel</span>
                    </Button>
                    <Button>
                        <FilePlus size={20} />
                        <span className="ml-2">Create</span>
                    </Button>
                </div>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Create a new note</CardTitle>
                    <CardDescription>Add the details and click create button</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action="" method="post">
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        className="w-full"
                                        placeholder="Title"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="genre">Genre</Label>
                                    <Input
                                        id="genre"
                                        type="text"
                                        className="w-full"
                                        placeholder="Genre"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Add description here"
                                        className="min-h-32"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="coverFile">Cover Image</Label>
                                    <Input
                                        id="coverFile"
                                        type="file"
                                        className="w-full"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="noteFile">Note File</Label>
                                    <Input
                                        id="noteFile"
                                        type="file"
                                        className="w-full"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </form>
                </CardContent>
            </Card>
        </section>
    )
}

export default CreateNote