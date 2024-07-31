import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express';

import Book from '../../model/book'

import BadRequestError from "../../error/badRequest";
import { CreateBook } from '../../validate/book';


export async function createBook(req: Request, res: Response, next: NextFunction) {
  try {
    // 1.) get payload
    const {body: payload} =  req

    // 2.) validate payload
    const { error, value: validatedPayload } = CreateBook.validate(payload)
    if (error) {
      console.log('joi error')
      throw new BadRequestError(`${error.details[0].message}`)
    }

    // 3.) create new Book
    const newBook = await Book.create(validatedPayload)

    // 4.) response 
    res.status(StatusCodes.CREATED).json(newBook)
  } catch(err) {
    next(err)
  }
}