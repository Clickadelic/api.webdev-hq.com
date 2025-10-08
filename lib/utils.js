/**
 * Paginate a model
 * @param {import('@prisma/client').PrismaClient} prisma
 * @param {number} page
 * @param {number} limit
 * @param {object} options
 */
const paginate = async function paginate(model, page = 1, limit = 10, options = {}) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
        model.findMany({ skip, take: limit, ...options }),
        model.count(),
    ]);
    return {
        data,
        pagination: {
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            nextPage: page * limit < total ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null,
        },
    };
}

module.exports = paginate;