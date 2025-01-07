import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationBlog({ currentPage, totalPages, onPageChange }) {

  console.log(currentPage, totalPages, 'get pagi data')

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className="border-t border-t-gray-200 pt-[30px]">
      <PaginationContent className="justify-between w-full">
        <PaginationItem>
          <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
          />
        </PaginationItem>

        <div className="flex justify-center">
          {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(page);
                    }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
          ))}
          {/*<PaginationItem>*/}
          {/*  <PaginationLink href="#" isActive>*/}
          {/*    1*/}
          {/*  </PaginationLink>*/}
          {/*</PaginationItem>*/}
          {/*<PaginationItem>*/}
          {/*  <PaginationLink href="#">2</PaginationLink>*/}
          {/*</PaginationItem>*/}
          {/*<PaginationItem>*/}
          {/*  <PaginationLink href="#">3</PaginationLink>*/}
          {/*</PaginationItem>*/}
          {/*<PaginationItem>*/}
          {/*  <PaginationEllipsis />*/}
          {/*</PaginationItem>*/}
          {/*<PaginationItem>*/}
          {/*  <PaginationLink href="#">8</PaginationLink>*/}
          {/*</PaginationItem>*/}
          {/*<PaginationItem>*/}
          {/*  <PaginationLink href="#">9</PaginationLink>*/}
          {/*</PaginationItem>*/}
          {/*<PaginationItem>*/}
          {/*  <PaginationLink href="#">10</PaginationLink>*/}
          {/*</PaginationItem>*/}
        </div>

        <PaginationItem>
          <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationBlog;
