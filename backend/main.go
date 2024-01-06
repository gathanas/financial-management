package main

import (
	"log"
	"net/http"
	"sort"
	"strconv"
	"github.com/gin-gonic/gin"
)

var expenses = []Expense{
	{ID: 1, Description: "Bought a book", Category: "Books", Amount: 1, Price: 100, Date: "2021-01-01T00:00:00Z"},
	{ID: 2, Description: "Bought a pen", Category: "Stationary", Amount: 2, Price: 50, Date: "2021-01-02T00:00:00Z"},
	{ID: 3, Description: "Bought a pencil", Category: "Stationary", Amount: 1, Price: 10, Date: "2021-01-03T00:00:00Z"},
	{ID: 4, Description: "Bought a book", Category: "Books", Amount: 1, Price: 100, Date: "2021-01-04T00:00:00Z"},
}

type Expense struct {
	ID          int32  `json:"id"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Amount      int8   `json:"amount"`
	Price       int32  `json:"price"`
	Date        string `json:"date"`
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

	//log newExpense object in console
	log.Println(newExpense)

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
