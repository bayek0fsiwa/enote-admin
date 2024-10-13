import { Link } from "react-router-dom"
import { getNotes } from "@/http/api"
import { useQuery } from "@tanstack/react-query"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CardContent,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, CirclePlus } from "lucide-react"
import { Note } from "@/types"

const NotesPage = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    staleTime: 8.64e+7, // milliseconds = 1 day
  });


  return (
    <div>
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
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Link to={"/dashboard/notes/create"}>
          <Button>
            <CirclePlus size={20} />
            <span className="ml-2">Add Note</span>
          </Button>
        </Link>
      </div>

      <CardContent className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">img</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="hidden md:table-cell">
                Price
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Author
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Created at
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((note: Note) => {
              return <TableRow key={note._id}>
                <TableCell className="hidden sm:table-cell">
                  <img
                    alt={note.title}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={note.coverImage}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {note.title}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{note.genre}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  Free
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {/* Change this to author name instead _id */}
                  {note.author}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {/* Change this to createdAt */}
                  {note.updatedAt}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            })}

          </TableBody>
        </Table>
      </CardContent>
    </div>
  )
}

export default NotesPage