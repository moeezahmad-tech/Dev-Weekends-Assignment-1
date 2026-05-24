type FoodItemProps = {
  title: string;
  description: string;
  price: string;
  image: string;
};

const FoodItem = ({ title, description, price, image }: FoodItemProps) => {
  return (
    <article className="food-card">
      <div className="food-card__image">
        <img src={image} alt={title} />
      </div>
      <div className="food-card__body">
        <h3>{title}</h3>
        <p className="food-card__desc">{description}</p>
        <div className="food-card__footer">
          <span className="food-card__price">{price}</span>
          <button type="button">Add to cart</button>
        </div>
      </div>
    </article>
  );
};

export default FoodItem;
