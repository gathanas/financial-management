package main

import (
	"log"
	"net/http"
	"sort"
	"strconv"

	"github.com/gin-gonic/gin"
)

var expenses = []Expense{
	{ID: 1, Description: "Bought a book", Category: "books", Amount: 1, Price: 10000, Date: "2021-01-01T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 2, Description: "Bought a pen", Category: "stationary", Amount: 2, Price: 50000, Date: "2021-01-02T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 3, Description: "Bought a pencil", Category: "stationary", Amount: 1, Price: 10000, Date: "2021-01-03T00:00:00Z", MediaOfPayment: "card"},
	{ID: 4, Description: "Bought a book", Category: "other", Amount: 1, Price: 10000, Date: "2021-01-04T00:00:00Z", MediaOfPayment: "card"},
	{ID: 5, Description: "Bought a laptop", Category: "electronics", Amount: 1, Price: 100000, Date: "2021-01-05T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 6, Description: "Bought a phone", Category: "electronics", Amount: 1, Price: 80000, Date: "2021-01-06T00:00:00Z", MediaOfPayment: "card"},
	{ID: 7, Description: "Bought a shirt", Category: "clothing", Amount: 1, Price: 5000, Date: "2021-01-07T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 8, Description: "Bought a dress", Category: "clothing", Amount: 1, Price: 15000, Date: "2021-01-08T00:00:00Z", MediaOfPayment: "card"},
	{ID: 9, Description: "Bought a chair", Category: "furniture", Amount: 1, Price: 20000, Date: "2021-01-09T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 10, Description: "Bought a table", Category: "furniture", Amount: 1, Price: 30000, Date: "2021-01-10T00:00:00Z", MediaOfPayment: "card"},
	{ID: 11, Description: "Bought a TV", Category: "electronics", Amount: 1, Price: 120000, Date: "2021-01-11T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 12, Description: "Bought a monitor", Category: "electronics", Amount: 1, Price: 50000, Date: "2021-01-12T00:00:00Z", MediaOfPayment: "card"},
	{ID: 13, Description: "Bought a bookshelf", Category: "furniture", Amount: 1, Price: 25000, Date: "2021-01-13T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 14, Description: "Bought a lamp", Category: "furniture", Amount: 1, Price: 10000, Date: "2021-01-14T00:00:00Z", MediaOfPayment: "card"},
	{ID: 15, Description: "Bought a jacket", Category: "clothing", Amount: 1, Price: 8000, Date: "2021-01-15T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 16, Description: "Bought a hat", Category: "clothing", Amount: 1, Price: 3000, Date: "2021-01-16T00:00:00Z", MediaOfPayment: "card"},
	{ID: 17, Description: "Bought a bike", Category: "sports", Amount: 1, Price: 50000, Date: "2021-01-17T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 18, Description: "Bought a skateboard", Category: "sports", Amount: 1, Price: 20000, Date: "2021-01-18T00:00:00Z", MediaOfPayment: "card"},
	{ID: 19, Description: "Bought a soccer ball", Category: "sports", Amount: 1, Price: 5000, Date: "2021-01-19T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 20, Description: "Bought a tennis racket", Category: "sports", Amount: 1, Price: 10000, Date: "2021-01-20T00:00:00Z", MediaOfPayment: "card"},
	{ID: 21, Description: "Bought a camera", Category: "electronics", Amount: 1, Price: 70000, Date: "2021-01-21T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 22, Description: "Bought a tripod", Category: "electronics", Amount: 1, Price: 15000, Date: "2021-01-22T00:00:00Z", MediaOfPayment: "card"},
	{ID: 23, Description: "Bought a book", Category: "books", Amount: 1, Price: 10000, Date: "2021-01-23T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 24, Description: "Bought a pen", Category: "stationary", Amount: 2, Price: 50000, Date: "2021-01-24T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 25, Description: "Bought a pencil", Category: "stationary", Amount: 1, Price: 10000, Date: "2021-01-25T00:00:00Z", MediaOfPayment: "card"},
	{ID: 26, Description: "Bought a book", Category: "other", Amount: 1, Price: 10000, Date: "2021-01-26T00:00:00Z", MediaOfPayment: "card"},
	{ID: 27, Description: "Bought a laptop", Category: "electronics", Amount: 1, Price: 100000, Date: "2021-01-27T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 28, Description: "Bought a phone", Category: "electronics", Amount: 1, Price: 80000, Date: "2021-01-28T00:00:00Z", MediaOfPayment: "card"},
	{ID: 29, Description: "Bought a shirt", Category: "clothing", Amount: 1, Price: 5000, Date: "2021-01-29T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 30, Description: "Bought a dress", Category: "clothing", Amount: 1, Price: 15000, Date: "2021-01-30T00:00:00Z", MediaOfPayment: "card"},
	{ID: 31, Description: "Bought a chair", Category: "furniture", Amount: 1, Price: 20000, Date: "2021-01-31T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 32, Description: "Bought a table", Category: "furniture", Amount: 1, Price: 30000, Date: "2021-02-01T00:00:00Z", MediaOfPayment: "card"},
	{ID: 33, Description: "Bought a TV", Category: "electronics", Amount: 1, Price: 120000, Date: "2021-02-02T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 34, Description: "Bought a monitor", Category: "electronics", Amount: 1, Price: 50000, Date: "2021-02-03T00:00:00Z", MediaOfPayment: "card"},
	{ID: 35, Description: "Bought a bookshelf", Category: "furniture", Amount: 1, Price: 25000, Date: "2021-02-04T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 36, Description: "Bought a lamp", Category: "furniture", Amount: 1, Price: 10000, Date: "2021-02-05T00:00:00Z", MediaOfPayment: "card"},
	{ID: 37, Description: "Bought a jacket", Category: "clothing", Amount: 1, Price: 8000, Date: "2021-02-06T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 38, Description: "Bought a hat", Category: "clothing", Amount: 1, Price: 3000, Date: "2021-02-07T00:00:00Z", MediaOfPayment: "card"},
	{ID: 39, Description: "Bought a bike", Category: "sports", Amount: 1, Price: 50000, Date: "2021-02-08T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 40, Description: "Bought a skateboard", Category: "sports", Amount: 1, Price: 20000, Date: "2021-02-09T00:00:00Z", MediaOfPayment: "card"},
	{ID: 41, Description: "Bought a soccer ball", Category: "sports", Amount: 1, Price: 5000, Date: "2021-02-10T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 42, Description: "Bought a tennis racket", Category: "sports", Amount: 1, Price: 10000, Date: "2021-02-11T00:00:00Z", MediaOfPayment: "card"},
	{ID: 43, Description: "Bought a camera", Category: "electronics", Amount: 1, Price: 70000, Date: "2021-02-12T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 44, Description: "Bought a tripod", Category: "electronics", Amount: 1, Price: 15000, Date: "2021-02-13T00:00:00Z", MediaOfPayment: "card"},
	{ID: 45, Description: "Bought a book", Category: "books", Amount: 1, Price: 10000, Date: "2021-02-14T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 46, Description: "Bought a pen", Category: "stationary", Amount: 2, Price: 50000, Date: "2021-02-15T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 47, Description: "Bought a pencil", Category: "stationary", Amount: 1, Price: 10000, Date: "2021-02-16T00:00:00Z", MediaOfPayment: "card"},
	{ID: 48, Description: "Bought a book", Category: "other", Amount: 1, Price: 10000, Date: "2021-02-17T00:00:00Z", MediaOfPayment: "card"},
	{ID: 49, Description: "Bought a laptop", Category: "electronics", Amount: 1, Price: 100000, Date: "2021-02-18T00:00:00Z", MediaOfPayment: "cash"},
	{ID: 50, Description: "Bought a phone", Category: "electronics", Amount: 1, Price: 80000, Date: "2021-02-19T00:00:00Z", MediaOfPayment: "card"},
}

type Expense struct {
	ID             int32  `json:"id"`
	Description    string `json:"description"`
	Category       string `json:"category"`
	Amount         int8   `json:"amount"`
	Price          int32  `json:"price"`
	Date           string `json:"date"`
	MediaOfPayment string `json:"mediaOfPayment"`
}

// getAlbums responds with the list of all albums as JSON.

// funtion to sort expenses by date
func sortExpensesByDate(unsortedExpenses []Expense) []Expense {
	// Create a copy of the unsortedExpenses slice.
	sortedExpenses := make([]Expense, len(unsortedExpenses))
	copy(sortedExpenses, unsortedExpenses)

	// Sort the copy.
	sort.Slice(sortedExpenses, func(i, j int) bool {
		return sortedExpenses[i].Date < sortedExpenses[j].Date
	})

	// Return the sorted copy.
	return sortedExpenses
}

// Create get expenses function
func getExpenses(c *gin.Context) {
	sortedExpenses := sortExpensesByDate(expenses)

	c.IndentedJSON(http.StatusOK, sortedExpenses)
}

func saveExpense(c *gin.Context) {
	var newExpense Expense

	//Add id to newExpense based on list expense
	//Find the biggest id of the list and then add one to create the new id
	var biggestId int32 = 0
	for _, expense := range expenses {
		if expense.ID > biggestId {
			biggestId = expense.ID
		}
	}

	//Add biggest id to newExpense before binding
	newExpense.ID = biggestId + 1
	// Bind the newExpense object to the request body
	c.BindJSON(&newExpense)

	expenses = append(expenses, newExpense)

	c.IndentedJSON(http.StatusCreated, newExpense)
	return
}

func deleteExpense(c *gin.Context) {
	id := c.Param("id")
	var idInt64 int64
	//convert id to int64
	idInt64, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		log.Println(err)
	}
	for index, expense := range expenses {
		if expense.ID == int32(idInt64) {
			expenses = append(expenses[:index], expenses[index+1:]...)
			break
		}
	}
	c.IndentedJSON(http.StatusOK, expenses)
}

func main() {
	router := gin.Default()
	// // Connection string
	// connStr := "postgres://postgres:test@localhost:5432/postgres?sslmode=disable"

	// // Open a connection to the database
	// db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	// if err != nil {
	// 	panic(err)
	// }

	// // Perform automatic migrations
	// err = db.AutoMigrate(&models.Recipe{}, &models.Ingredient{}, &models.IngredientCategory{}, &models.Component{}, &models.Step{})
	// if err != nil {
	// 	panic(err)
	// }
	router.GET("/expenses", getExpenses)
	router.POST("/expenses", saveExpense)
	router.DELETE("/expenses/:id", deleteExpense)
	router.Run("localhost:8080")
}
