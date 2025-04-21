import { useState } from "react"
import "./Pagination.css"

const initialState = [10, 25, 50, 100]

interface PaginationProps {
    onChangePerPage: (numberPerPage: number) => void,
    numberPerPage: number,
    numbersPages: number[],
    currentPage: number,
    onChangePage: (numberPage: number) => void,
}

const Pagination = ({onChangePerPage, numberPerPage, onChangePage, numbersPages, currentPage}: PaginationProps) => {
    const [perPage, setPerPage] = useState<number[]>(initialState)

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onChangePage(Number(e.target.innerText))
    }

    const handleClickNextPage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (numbersPages.length !== currentPage) {
            onChangePage(currentPage + 1)
        }
    }

    const handleClickPreviousPage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (numbersPages[0] !== currentPage) {
            onChangePage(currentPage - 1)
        }
    }

    return (
        <div className="pagination">
            <div className="select-number-page">
                <p>Mostrar</p>
                <select defaultValue={numberPerPage} onChange={(e) => onChangePerPage(Number(e.target.value))}>
                    {
                        perPage.map((pageNumber, index) => (
                            <option key={index} value={pageNumber}>{pageNumber}</option>
                        ))
                    }
                </select>
                <p>por página</p>
            </div>
            <div className="pages">
                <div>{'<<'}</div>
                <div onClick={handleClickPreviousPage}>{'<'}</div>
                {
                    numbersPages.map((numPage) => (
                        <div onClick={handleClick} className={currentPage === numPage ? "page-number page-number-selected" : "page-number"}>
                            {numPage}
                        </div>
                    ))
                }
                <div onClick={handleClickNextPage}>{'>'}</div>
                <div>{'>>'}</div>
            </div>
        </div>
    )
}

export default Pagination